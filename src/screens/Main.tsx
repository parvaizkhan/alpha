import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Composer, LogoutButton} from '@alpha/components';
import {useStyles, StylesGenerator} from '../hooks';
import {useHeaderHeight, StackScreenProps} from '@react-navigation/stack';
import {AppRoutes} from '../Alpha';

type Props = StackScreenProps<AppRoutes, 'Main'>;

const Main = (props: Props) => {
  const [message, onChangeMessage] = useState('');

  const s = useStyles(makeStyles);
  const headerheight = useHeaderHeight();

  const handleLogout = useCallback(async () => {
    await auth().signOut();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <LogoutButton onPress={handleLogout} />,
    });
  }, [props.navigation, handleLogout]);

  const renderItem = useCallback(() => <></>, []);

  return (
    <View style={s.container}>
      <KeyboardAvoidingView
        behavior={'padding'}
        style={s.content}
        enabled={Platform.OS === 'ios'}
        keyboardVerticalOffset={headerheight}>
        <FlatList
          data={[]}
          contentContainerStyle={s.list}
          keyboardShouldPersistTaps={'handled'}
          {...{renderItem}}
        />
        <Composer {...{message, onChangeMessage}} />
      </KeyboardAvoidingView>
    </View>
  );
};

const makeStyles: StylesGenerator = ({colors}, insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
      paddingBottom: insets.bottom,
    },
    content: {
      flex: 1,
    },
    list: {
      flexGrow: 1,
    },
  });

export default Main;
