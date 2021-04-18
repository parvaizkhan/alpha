import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useStyles, Theme} from '@alpha/hooks';

import {Text} from './Text';

export type TextMessageProps = {
  text: string;
};
export const TextMessage = React.memo<TextMessageProps>((props) => {
  const {text} = props;
  const s = useStyles(makeStyles);

  return (
    <View style={s.container}>
      <Text>{text}</Text>
    </View>
  );
});

const makeStyles = ({colors}: Theme) =>
  StyleSheet.create({
    container: {},
    link: {
      color: colors.linkColor,
    },
  });
