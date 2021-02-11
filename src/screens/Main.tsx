import React, {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import flatten from 'lodash/flatten';
import {StackScreenProps, useHeaderHeight} from '@react-navigation/stack';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {Avatar, Composer, LogoutButton, MessageBox} from '@alpha/components';
import {StoreContext} from '@alpha/store';
import {Message, MessagePayload} from '@alpha/types';

import {AppRoutes} from '../Alpha';
import {EdgeInsets, Theme, useStyles} from '../hooks';

const PAGE_SIZE = 15;

const db = firestore();

const messagesRef = db.collection<MessagePayload>('chatrooms/alpha/messages');
const query = messagesRef.orderBy('createdAt', 'desc').limit(PAGE_SIZE);

type Props = StackScreenProps<AppRoutes, 'Main'>;

type State = {
  messages: Message[][];
  page: number;
  exhausted: boolean;
};

const initialState: State = {
  exhausted: false,
  messages: [],
  page: 1,
};

type ActionBase<K, V = void> = V extends void ? {type: K} : {type: K} & V;

type Action =
  | ActionBase<
      'UPDATE_PAGE',
      {
        payload: {
          page: number;
          docs: FirebaseFirestoreTypes.DocumentChange<MessagePayload>[];
        };
      }
    >
  | ActionBase<'MESSAGES_EXHAUSTED'>
  | ActionBase<'LOAD_MORE'>;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE': {
      const {page: currentPageIndex, docs} = action.payload;

      const groupMessages = state.messages.slice(0);
      let currentPage = groupMessages[currentPageIndex] || [];
      const newMessages: Message[] = [];
      const updatedMessages: Message[] = [];

      docs.forEach(({type, doc}) => {
        if (doc.exists) {
          if (type === 'added') {
            newMessages.push(doc);
          }
          if (type === 'modified') {
            updatedMessages.push(doc);
          }
        }
      });

      if (updatedMessages.length) {
        updatedMessages.forEach((updatedMessage) => {
          console.log(currentPageIndex, currentPage, updatedMessages);
          currentPage = currentPage.map((currentMessage) => {
            if (currentMessage.id === updatedMessage.id) {
              return updatedMessage;
            }
            return currentMessage;
          });
        });
      }

      groupMessages[currentPageIndex] = [...newMessages, ...currentPage];

      return {
        ...state,
        messages: groupMessages,
      };
    }

    case 'MESSAGES_EXHAUSTED':
      return {
        ...state,
        exhausted: true,
      };

    case 'LOAD_MORE':
      return {
        ...state,
        page: state.page + 1,
      };

    default:
      return state;
  }
};

const Main = (props: Props) => {
  const [message, onChangeMessage] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const {user} = props.route.params;

  const s = useStyles(makeStyles);
  const headerheight = useHeaderHeight();
  const _subscriptions = useRef<(() => void)[]>([]);
  const _lastMessage = useRef<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<MessagePayload>
  >();

  const handleLogout = useCallback(() => auth().signOut(), []);

  useEffect(() => {
    const lastPage = state.messages[state.messages.length - 1];
    if (lastPage) {
      _lastMessage.current = lastPage[lastPage.length - 1];
      if (lastPage.length < PAGE_SIZE) {
        dispatch({type: 'MESSAGES_EXHAUSTED'});
      }
    }
  }, [state.messages]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleMessagesCollectionUpdateForPage = useCallback(
    (pageIndex: number) => (
      querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<MessagePayload> | null,
    ) => {
      if (querySnapshot) {
        dispatch({
          type: 'UPDATE_PAGE',
          payload: {
            page: pageIndex - 1,
            docs: querySnapshot.docChanges({includeMetadataChanges: true}),
          },
        });
      }
    },
    [],
  );

  const loadPage = useCallback(
    (page: number) => {
      _subscriptions.current.push(
        (_lastMessage.current
          ? query.startAfter(_lastMessage.current)
          : query
        ).onSnapshot(
          {includeMetadataChanges: true},
          handleMessagesCollectionUpdateForPage(page),
        ),
      );
    },
    [handleMessagesCollectionUpdateForPage],
  );

  useEffect(() => {
    loadPage(state.page);
  }, [state.page, loadPage]);

  useEffect(
    () => () => {
      if (_subscriptions.current) {
        _subscriptions.current.forEach((unsubscribe) => {
          if (unsubscribe) {
            unsubscribe();
          }
        });
      }
    },
    [],
  );

  const handleOnEndReached = useCallback(() => {
    if (!state.exhausted) {
      dispatch({type: 'LOAD_MORE'});
    }
  }, [state.exhausted]);

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

  const messages = useMemo(() => flatten(state.messages), [state.messages]);

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
