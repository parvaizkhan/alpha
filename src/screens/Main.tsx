import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  ListRenderItem,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useHeaderHeight, StackScreenProps} from '@react-navigation/stack';

import {Composer, LogoutButton, Avatar, MessageBox} from '@alpha/components';
import {useStyles, Theme, EdgeInsets} from '../hooks';
import {StoreContext} from '@alpha/store';
import {Message} from '@alpha/types';
import {AppRoutes} from '../Alpha';

const MESSAGES = [
  {
    id: 'fe4a22',
    text: 'where are you man??',
    ownerID: 'roMfLOJSaAeNRgMOUqkO0Mwfmgw3',
  },
  {
    id: 'fe4a23',
    text: 'hola, you there!',
    ownerID: 'roMfLOJSaAeNRgMOUqkO0Mwfmgw2',
  },
  {
    id: 'fe4a24',
    text: 'yo, u good bruh',
    ownerID: 'roMfLOJSaAeNRgMOUqkO0Mwfmgw3',
  },
  {
    id: 'fe4a24',
    text: "voila, all's done",
    ownerID: 'roMfLOJSaAeNRgMOUqkO0Mwfmgw3',
  },
];

type Props = StackScreenProps<AppRoutes, 'Main'>;

const Main = (props: Props) => {
  const [message, onChangeMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const {user} = props.route.params;

  const s = useStyles(makeStyles);
  const headerheight = useHeaderHeight();

  const handleLogout = useCallback(async () => {
    await auth().signOut();
  }, []);

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

  return (
    <StoreContext.Provider value={{user}}>
      <View style={s.container}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={s.content}
          enabled={Platform.OS === 'ios'}
          keyboardVerticalOffset={headerheight}>
          <FlatList
            data={messages}
            inverted
            contentContainerStyle={s.list}
            keyExtractor={(_, i) => i.toString()}
            keyboardShouldPersistTaps={'handled'}
            ItemSeparatorComponent={() => <View style={s.separator} />}
            {...{renderItem}}
          />
          <Composer {...{message, onChangeMessage}} />
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
