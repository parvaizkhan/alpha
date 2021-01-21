import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {BRANDING} from '@alpha/constants';

import Main from '@alpha/screens/Main';
import Authentication from '@alpha/screens/Authentication';

export type AppRoutes = {
  Authentication: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<AppRoutes>();

function Alpha() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(
    () =>
      auth().onAuthStateChanged((appUser) => {
        setUser(appUser);
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
