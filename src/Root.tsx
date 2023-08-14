import './api';
import { registerRootComponent } from 'expo';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import App from './App';
import { UserContextProvider } from "./context/UserContext";
import { SafeAreaView } from "react-native";
import { GroupContextProvider } from "./context/GroupContext";
const Root = () => (
    <SafeAreaView  style={{ flex: 1 }}>
      <NavigationContainer>
        <NativeBaseProvider>
          <UserContextProvider>
          <GroupContextProvider>
            <App/>
            <StatusBar style="auto"/>
            </GroupContextProvider>
          </UserContextProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
);

registerRootComponent(Root);
