import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native';

import { GuestWelcomeScreen } from '../features/guest-welcome/screens/GuestWelcomeScreen'
import { SignUpScreen } from "../features/sign-up/screens/SignUpScreen";

const Stack = createStackNavigator()

export const GuestAppNavigator = () => (
    <Stack.Navigator
        screenOptions={ {
          headerStyle: {
            backgroundColor: '#fff',
            borderBottomWidth: 2,
            shadowColor: '#484848',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 2 },
          },
          cardStyle: { backgroundColor: '#fff' },
        } }
    >
      <Stack.Screen
          name="GuestWelcome"
          component={ GuestWelcomeScreen }
          options={
            {
              title: 'ReSearch Decide',
              headerTitleAlign: 'left',
              headerTitleStyle: headerTitleStyle.headerTitle,
            }
          }
      />
      <Stack.Screen
          name="SignUpScreen"
          component={ SignUpScreen }
          options={
            {
              title: 'ReSearch Decide',
              headerTitleAlign: 'left',
              headerTitleStyle: headerTitleStyle.headerTitle,
            }
          }
      />
    </Stack.Navigator>

)

const headerTitleStyle = StyleSheet.create({
  headerTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '300',
    paddingVertical: 10,
  },
});