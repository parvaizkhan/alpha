import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useStyles} from '@alpha/hooks';
import {Message} from '@alpha/types';

import {MessageBubble} from './components';
import {useStore} from '@alpha/store';

export type MessageBoxProps = {
  message: Message;
  isFirst: boolean;
};
export const MessageBox = React.memo<MessageBoxProps>((props) => {
  const {message, isFirst} = props;
  const data = message.data();

  const s = useStyles(makeStyles);
  const {user} = useStore();

  const position = data?.uid === user.uid ? 'right' : 'left';

  return (
    <View style={s.container}>
      <MessageBubble {...{message, position, isFirst}} />
    </View>
  );
});

const makeStyles = () =>
  StyleSheet.create({
    container: {},
  });
