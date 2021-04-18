import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useStyles, Theme} from '@alpha/hooks';
import {Message} from '@alpha/types';

import {Text} from '../../Text';
import {TextMessage} from '@alpha/components';

export type MessageContentProps = {
  message: Message;
};
export const MessageContent = React.memo<MessageContentProps>((props) => {
  const {message} = props;
  const data = message.data();
  const s = useStyles(makeStyles);

  return (
    <View style={s.container}>
      <TextMessage text={data?.text} />
    </View>
  );
});

const makeStyles = ({}: Theme) =>
  StyleSheet.create({
    container: {},
  });
