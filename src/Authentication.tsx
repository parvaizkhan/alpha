import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useStyles, StylesGenerator} from '@alpha/hooks';
import {Text, Button} from '@alpha/components';
import {BRANDING} from '@alpha/constants';

const Authentication = () => {
  const s = useStyles(makeStyles);

  return (
    <View style={s.container}>
      <Text variant={'logo'} style={s.heading} textAlign="center">
        {BRANDING}
      </Text>
      <Button title={'Google'} />
    </View>
  );
};

const makeStyles: StylesGenerator = ({colors, spacing}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
      justifyContent: 'center',
      padding: spacing.s,
    },
    heading: {
      marginBottom: '20%',
    },
  });

export default Authentication;
