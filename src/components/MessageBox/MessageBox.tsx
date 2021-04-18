import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useStyles} from '@alpha/hooks';
import {Message} from '@alpha/types';

import {MessageBubble} from './components';
import {useStore} from '@alpha/store';

export type MessageBoxProps = {
  message: Message;
  isFirst: boolean;
  previousMessage?: Message;
};
export const MessageBox = React.memo<MessageBoxProps>((props) => {
  const {message, isFirst, previousMessage} = props;
  const currentMessageContent = message.data();
  const previousMessageContent = previousMessage?.data();

  const s = useStyles(makeStyles);
  const {user} = useStore();

  const position =
    currentMessageContent?.createdBy?.uid === user?.uid ? 'right' : 'left';
  const hasPreviousMessage =
    previousMessageContent?.createdBy?.uid ===
    currentMessageContent.createdBy?.uid;

  return (
    <View style={s[position].container}>
      <MessageBubble {...{message, position, isFirst, hasPreviousMessage}} />
    </View>
  );
});

const makeStyles = () => ({
  left: StyleSheet.create({
    container: {
      paddingRight: '15%',
    },
  }),
  right: StyleSheet.create({
    container: {
      paddingLeft: '15%',
    },
  }),
});
