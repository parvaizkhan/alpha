import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useStyles, Theme} from '@alpha/hooks';
import {Message} from '@alpha/types';

import {MessageContent} from './MessageContent';

export type MessageBubbleProps = {
  message: Message;
  position: 'left' | 'right';
  isFirst: boolean;
};
export const MessageBubble = React.memo<MessageBubbleProps>((props) => {
  const {message, position, isFirst} = props;
  const styles = useStyles(makeStyles);
  const {s} = styles;

  return (
    <View
      style={[
        s.container,
        styles[position].placement,
        isFirst && styles[position].borderRadius,
      ]}>
      <MessageContent {...{message}} />
    </View>
  );
});

const makeStyles = ({spacing}: Theme) => ({
  left: StyleSheet.create({
    placement: {
      alignSelf: 'flex-start',
    },
    borderRadius: {
      borderBottomLeftRadius: spacing.s,
    },
  }),
  right: StyleSheet.create({
    placement: {
      alignSelf: 'flex-end',
    },
    borderRadius: {
      borderBottomRightRadius: spacing.s,
    },
  }),
  s: StyleSheet.create({
    container: {
      minHeight: 40,
      backgroundColor: '#fff',
      borderRadius: 20,

      shadowColor: 'rgba(0,0,0,0.1)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 5,

      elevation: 5,

      padding: spacing.l,
    },
  }),
});
