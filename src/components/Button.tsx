import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {Control} from './Layouts';
import {StylesGenerator, useStyles} from '@alpha/hooks';
import {Text} from './Text';

export type ButtonProps = {
  title: string;
} & TouchableOpacityProps;
export const Button = React.memo<ButtonProps>(({style, title, ...props}) => {
  const s = useStyles(makeStyles);

  return (
    <Control style={s.container}>
      <TouchableOpacity activeOpacity={0.8} style={s.button} {...props}>
        <Text variant={'heading'} color={'white'}>
          {title}
        </Text>
      </TouchableOpacity>
    </Control>
  );
});

const makeStyles: StylesGenerator = ({colors}) =>
  StyleSheet.create({
    container: {backgroundColor: colors.buttonPrimary},
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
