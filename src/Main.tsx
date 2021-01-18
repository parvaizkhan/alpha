import React, {useCallback, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {Composer} from '@alpha/components';

const Main = () => {
  const [message, onChangeMessage] = useState('');
  const renderItem = useCallback(() => <></>, []);

  return (
    <View style={s.container}>
      <FlatList
        data={[]}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'handled'}
        {...{renderItem}}
      />
      <Composer {...{message, onChangeMessage}} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
