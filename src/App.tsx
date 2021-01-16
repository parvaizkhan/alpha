import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './Main';

export type AppRoutes = {
  Main: undefined;
}

const Stack = createStackNavigator<AppRoutes>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{ title: 'Alpha' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;