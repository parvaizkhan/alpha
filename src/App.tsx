import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme';

import {BRANDING} from '@alpha/constants';

import Main from '@alpha/Main';
import Authentication from '@alpha/Authentication';

export type AppRoutes = {
  Authentication: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<AppRoutes>();

function App() {
  return (
    <ThemeProvider {...{theme}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Main'}
          screenOptions={{headerTitleAlign: 'center'}}>
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{title: BRANDING}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
