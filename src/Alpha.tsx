import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import {generateAppUser} from '@alpha/utils';
import {BRANDING} from '@alpha/constants';
import {User} from '@alpha/types';

import Main from '@alpha/screens/Main';
import Authentication from '@alpha/screens/Authentication';

export type AppRoutes = {
  Authentication: undefined;
  Main: {user: User};
};

const Stack = createStackNavigator<AppRoutes>();

function Alpha() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () =>
      auth().onAuthStateChanged((appUser) => {
        setUser(appUser && generateAppUser(appUser));
        if (isInitializing) {
          setIsInitializing(false);
        }
      }),
    [isInitializing],
  );

  if (isInitializing) {
    return <></>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        {user ? (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{title: BRANDING}}
            initialParams={{user}}
          />
        ) : (
          <Stack.Screen
            name="Authentication"
            component={Authentication}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Alpha;
