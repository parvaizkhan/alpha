import React, {useCallback, useState} from 'react';
import {
  View,
  FlatList,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import {Composer} from '@alpha/components';
import {useStyles, StylesGenerator} from './hooks';
import {useHeaderHeight} from '@react-navigation/stack';

const Main = () => {
  const [message, onChangeMessage] = useState('');

  const s = useStyles(makeStyles);
  const headerheight = useHeaderHeight();

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
