import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

import {useStyles, StylesGenerator} from '@alpha/hooks';
import {Text, Button} from '@alpha/components';
import {BRANDING} from '@alpha/constants';

const Authentication = () => {
  const s = useStyles(makeStyles);

  const handleAnonymousSignIn = useCallback(async () => {
    try {
      await auth().signInAnonymously();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={s.container}>
      <Text variant={'logo'} style={s.heading} textAlign="center">
        {BRANDING}
      </Text>
      <Button title={'Google'} />
      <Button
        style={s.marginTop}
        title={'Anonymously'}
        onPress={handleAnonymousSignIn}
      />
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
    marginTop: {
      marginTop: spacing.m,
    },
  });

export default Authentication;
