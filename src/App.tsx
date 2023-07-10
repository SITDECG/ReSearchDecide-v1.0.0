import React from 'react';
import { GuestAppNavigator } from './navigation/GuestAppNavigator';
import { useUserContext } from "./context/UserContext";
import { Spinner, View, Text } from "native-base";
import { VerifiedAppNavigator } from "./navigation/VerifiedAppNavigator";

const App = () => {

  const { user, isLoading, error } = useUserContext();

  if (error) {
    return <GuestAppNavigator/>;
  }

  if (isLoading) {
    return (
        <View>
          <Text>Loading...</Text>
          <Spinner></Spinner>
        </View>
    )
  }

  if (user) {
    return <VerifiedAppNavigator/>

  }

  return <GuestAppNavigator/>
};

export default App;
