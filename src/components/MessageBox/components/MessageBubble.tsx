import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {format} from 'date-fns';

import {useStyles, Theme, useTheme} from '@alpha/hooks';
import {MessageContent} from './MessageContent';
import {Text} from '@alpha/components/Text';
import {Message} from '@alpha/types';

export type MessageBubbleProps = {
  message: Message;
  position: 'left' | 'right';
  isFirst: boolean;
  hasPreviousMessage: boolean;
};
export const MessageBubble = React.memo<MessageBubbleProps>((props) => {
  const {message, position, isFirst, hasPreviousMessage} = props;
  const styles = useStyles(makeStyles);
  const theme = useTheme();
  const {s} = styles;

  const {createdBy, createdAt} = message.data();
  const showName =
    !hasPreviousMessage && position === 'left' && createdBy.displayName;

  return (
    <View
      style={[
        s.container,
        styles[position].placement,
        isFirst && styles[position].borderRadius,
      ]}>
      {showName && <Text style={s.name}>{createdBy.displayName}</Text>}
      <MessageContent {...{message}} />
      {createdAt ? (
        <Text style={s.date}>{format(createdAt.toDate(), 'hh:mm a')}</Text>
      ) : (
        <ActivityIndicator
          size={'small'}
          color={theme.colors.loading}
          style={s.loading}
        />
      )}
    </View>
  );
});

const makeStyles = ({spacing, colors}: Theme) => ({
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

      paddingHorizontal: spacing.l,
      paddingTop: spacing.l,
      paddingBottom: spacing.s,
    },
    name: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.linkColor,
      letterSpacing: -0.3,
    },
    date: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.messageTime,
      marginTop: spacing.s,
      textAlign: 'right',
    },
    loading: {
      alignSelf: 'flex-end',
    },
  }),
});
