import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';

import {Control} from './Layouts';
import {useStyles, useTheme, Theme} from '@alpha/hooks';
import {Text} from './Text';

export type ButtonProps = {
  title?: string;
  isBusy?: boolean;
  vanilla?: boolean;
} & TouchableOpacityProps;
export const Button: React.FC<ButtonProps> = React.memo(
  ({style, title, children, isBusy, vanilla, ...props}) => {
    const s = useStyles(makeStyles);
    const {colors} = useTheme();

    const button = (
      <TouchableOpacity activeOpacity={0.8} style={s.button} {...props}>
        {isBusy ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : title ? (
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

const makeStyles = ({colors}: Theme) =>
  StyleSheet.create({
    container: {backgroundColor: colors.buttonPrimary},
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
