import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import {useStyles, Theme} from '@alpha/hooks';
import {Text, Button} from '@alpha/components';
import {BRANDING} from '@alpha/constants';

GoogleSignin.configure();

type SignInMethods = 'google' | 'anonymous';

const Authentication = () => {
  const [inProgress, setInProgress] = useState<SignInMethods | 'idle'>('idle');
  const s = useStyles(makeStyles);

  const handleAnonymousSignIn = useCallback(async () => {
    try {
      setInProgress('anonymous');
      await auth().signInAnonymously();
    } catch (error) {
      console.log(error);
    } finally {
      setInProgress('idle');
    }
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setInProgress('google');
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    } finally {
      setInProgress('idle');
    }
  }, []);

  return (
    <View style={s.container}>
      <Text variant={'logo'} style={s.heading} textAlign="center">
        {BRANDING}
      </Text>
      <Button
        title={'Google'}
        onPress={handleGoogleSignIn}
        isBusy={inProgress === 'google'}
      />
      <Button
        style={s.marginTop}
        title={'Anonymously'}
        onPress={handleAnonymousSignIn}
        isBusy={inProgress === 'anonymous'}
      />
    </View>
  );
};

const makeStyles = ({colors, spacing}: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
      justifyContent: 'center',
      padding: spacing.m,
    },
    heading: {
      marginBottom: '20%',
    },
    marginTop: {
      marginTop: spacing.m,
    },
  });

export default Authentication;
