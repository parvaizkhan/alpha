import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {StackScreenProps, useHeaderHeight} from '@react-navigation/stack';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Avatar, Composer, LogoutButton, MessageBox} from '@alpha/components';
import {StoreContext} from '@alpha/store';
import {Message, MessagePayload} from '@alpha/types';

import {AppRoutes} from '../../Alpha';
import {EdgeInsets, Theme, useStyles} from '../../hooks';
import useMessages from './useMessages';

const db = firestore();

const messagesRef = db.collection<MessagePayload>('chatrooms/alpha/messages');

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

  const renderItem = useCallback<ListRenderItem<Message>>(
    ({item, index}) => <MessageBox message={item} isFirst={index === 0} />,
    [],
  );

  const onSubmit = useCallback(() => {
    const {uid, photoURL} = user;
    onChangeMessage('');
    messagesRef.add({
      uid,
      photoURL,
      text: message,
      // @ts-ignore
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }, [message, user]);

  return (
    <StoreContext.Provider value={{user}}>
      <View style={s.container}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={s.content}
          enabled={Platform.OS === 'ios'}
          keyboardVerticalOffset={headerheight}>
          <FlatList
            inverted
            data={messages}
            contentContainerStyle={s.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            keyboardShouldPersistTaps={'handled'}
            onEndReached={handleOnEndReached}
            onEndReachedThreshold={0}
            ItemSeparatorComponent={() => <View style={s.separator} />}
            {...{renderItem}}
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
  });

export default Main;
