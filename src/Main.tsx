import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {Composer} from '@alpha/components';

const Main = () => {
  const renderItem = useCallback(() => <></>, []);

  return (
    <View style={s.container}>
      <FlatList
        data={[]}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'handled'}
        {...{renderItem}}
      />
      <Composer />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
