import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {StylesGenerator, useStyles} from '@alpha/hooks';
import {FORM_CONTROL_HEIGHT, FORM_CONTROL_RADIUS} from '@alpha/constants';

export const Control: React.FC<ViewProps> = ({children, style, ...props}) => {
  const s = useStyles(makeControlStyles);

  return (
    <View style={[s.container, StyleSheet.flatten(style)]} {...props}>
      {children}
    </View>
  );
};

export const makeControlStyles: StylesGenerator = () =>
  StyleSheet.create({
    container: {
      minHeight: FORM_CONTROL_HEIGHT,
      borderRadius: FORM_CONTROL_RADIUS,
    },
  });
