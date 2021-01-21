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
  title?: string;
  vanilla?: boolean;
} & TouchableOpacityProps;
export const Button: React.FC<ButtonProps> = React.memo(
  ({style, title, children, vanilla, ...props}) => {
    const s = useStyles(makeStyles);

    const button = (
      <TouchableOpacity activeOpacity={0.8} style={s.button} {...props}>
        {title ? (
          <Text variant={'heading'} color={'white'}>
            {title}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    );

    if (vanilla) {
      return button;
    }

    return (
      <Control style={[s.container, StyleSheet.flatten(style)]}>
        {button}
      </Control>
    );
  },
);

const makeStyles: StylesGenerator = ({colors}) =>
  StyleSheet.create({
    container: {backgroundColor: colors.buttonPrimary},
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
