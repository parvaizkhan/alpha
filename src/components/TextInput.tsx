import React from 'react';
import {
  View,
  StyleSheet,
  TextInputProps,
  TextInput as RNTextInput,
} from 'react-native';

import {useStyles, StylesGenerator} from '@alpha/hooks';
import {makeControlStyles} from './Layouts';

export const TextInput = React.memo<TextInputProps>(({style, ...props}) => {
  const s = useStyles(makeStyles);
  const c = useStyles(makeControlStyles);

  return (
    <View style={[s.container, c.container]}>
      <RNTextInput
        style={[s.textInput, StyleSheet.flatten(style)]}
        {...props}
      />
    </View>
  );
});

const makeStyles: StylesGenerator = ({colors, spacing}) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      paddingHorizontal: 18,
      paddingTop: spacing.s,
      backgroundColor: 'white',
      paddingBottom: spacing.s,
      justifyContent: 'center',
      borderColor: colors.borderColor,
    },
    textInput: {
      padding: 0,
      fontSize: 18,
      color: colors.inputText,
    },
  });