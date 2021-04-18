import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
  SectionList,
  KeyboardAvoidingView,
  SectionListRenderItem,
  Platform,
  StyleSheet,
  View,
  SectionListData,
} from 'react-native';
import {StackScreenProps, useHeaderHeight} from '@react-navigation/stack';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  Avatar,
  Composer,
  LogoutButton,
  MessageBox,
  Text,
} from '@alpha/components';
import {StoreContext} from '@alpha/store';
import {Message, MessagePayload} from '@alpha/types';
import {groupMessagesByDate, formatDateRelative} from '@alpha/utils';

import {AppRoutes} from '../../Alpha';
import {EdgeInsets, Theme, useStyles} from '../../hooks';
import useMessages from './useMessages';
import {ANONYMOUS_NAME} from '@alpha/constants';

const db = firestore();

const messagesRef = db.collection<MessagePayload>('chatrooms/alpha/messages');

type Section = ReturnType<typeof groupMessagesByDate>[0];
type Props = StackScreenProps<AppRoutes, 'Main'>;

const Main = (props: Props) => {
  const [message, onChangeMessage] = useState('');

  const {user} = props.route.params;

  const s = useStyles(makeStyles);
  const headerheight = useHeaderHeight();

  const {messages, isExhausted, loadMore} = useMessages(messagesRef);

  const handleLogout = useCallback(() => auth().signOut(), []);

  const handleOnEndReached = useCallback(() => {
    if (!isExhausted) {
      loadMore();
    }
  }, [isExhausted]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <LogoutButton onPress={handleLogout} />,
      headerLeft: () => <Avatar uri={auth().currentUser?.photoURL ?? ''} />,
    });
  }, [props.navigation, handleLogout]);

  const renderItem = useCallback<SectionListRenderItem<Message, Section>>(
    ({item, section: {index: sectionIndex, data}, index}) => (
      <MessageBox
        message={item}
        isFirst={index === 0 && sectionIndex === 0}
        previousMessage={data[index + 1]}
      />
    ),
    [],
  );

  const renderSectionFooter = useCallback(
    ({section: {title}}: {section: SectionListData<Message, Section>}) => (
      <View style={s.sectionFooter}>
        <Text style={s.date}>{formatDateRelative(new Date(title))}</Text>
      </View>
    ),
    [],
  );

  const onSubmit = useCallback(() => {
    const {uid, photoURL, displayName, isAnonymous} = user;
    onChangeMessage('');
    messagesRef
      .add({
        createdBy: {
          uid,
          displayName: isAnonymous ? ANONYMOUS_NAME : displayName,
          photoURL,
        },
        text: message,
        // @ts-ignore
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((e) => console.log(e));
  }, [message, user]);

  const data = useMemo(() => groupMessagesByDate(messages), [messages]);

  console.log(messages, data);

  return (
    <StoreContext.Provider value={{user}}>
      <View style={s.container}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={s.content}
          enabled={Platform.OS === 'ios'}
          keyboardVerticalOffset={headerheight}>
          <SectionList<Message, Section>
            inverted
            sections={data}
            contentContainerStyle={s.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            keyboardShouldPersistTaps={'handled'}
            onEndReached={handleOnEndReached}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={s.separator} />}
            SectionSeparatorComponent={() => <View style={s.separator} />}
            {...{renderItem, renderSectionFooter}}
          />
          <Composer {...{message, onChangeMessage, onSubmit}} />
        </KeyboardAvoidingView>
      </View>
    </StoreContext.Provider>
  );
};

const makeStyles = ({colors, spacing}: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
      paddingBottom: insets.bottom,
    },
    content: {
      flex: 1,
    },
    list: {
      flexGrow: 1,
      padding: spacing.m,
    },
    separator: {height: 10},
    sectionFooter: {
      padding: spacing.s,
    },
    date: {
      textAlign: 'center',
      color: colors.groupDate,
    },
  });

export default Main;
