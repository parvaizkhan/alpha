import flatten from 'lodash/flatten';
import {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

import {Message, MessagePayload, ActionBase} from '@alpha/types';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

const PAGE_SIZE = 15;

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

export default function useMessages(
  messagesRef: FirebaseFirestoreTypes.CollectionReference<MessagePayload>,
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const _query = useRef(
    messagesRef.orderBy('createdAt', 'desc').limit(PAGE_SIZE),
  );
  const _subscriptions = useRef<(() => void)[]>([]);
  const _lastMessage = useRef<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<MessagePayload>
  >();

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
          ? _query.current.startAfter(_lastMessage.current)
          : _query.current
        ).onSnapshot(
          {includeMetadataChanges: true},
          handleMessagesCollectionUpdateForPage(page),
        ),
      );
    },
    [handleMessagesCollectionUpdateForPage],
  );

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

  useEffect(() => {
    loadPage(state.page);
  }, [state.page, loadPage]);

  useEffect(() => {
    const lastPage = state.messages[state.messages.length - 1];
    if (lastPage) {
      _lastMessage.current = lastPage[lastPage.length - 1];
      if (lastPage.length < PAGE_SIZE) {
        dispatch({type: 'MESSAGES_EXHAUSTED'});
      }
    }
  }, [state.messages]);

  const messages = useMemo(() => flatten(state.messages), [state.messages]);

  const loadMore = useCallback(() => dispatch({type: 'LOAD_MORE'}), []);

  return {messages, isExhausted: state.exhausted, loadMore};
}
