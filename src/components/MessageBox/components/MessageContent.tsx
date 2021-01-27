import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useStyles, Theme} from '@alpha/hooks';
import {Message} from '@alpha/types';

import {Text} from '../../Text';

export type MessageContentProps = {
  message: Message;
};
export const MessageContent = React.memo<MessageContentProps>((props) => {
  const {message} = props;
  const s = useStyles(makeStyles);

  return (
    <View style={s.container}>
      <Text>{message.text}</Text>
    </View>
  );
});

const makeStyles = ({}: Theme) =>
  StyleSheet.create({
    container: {},
  });
