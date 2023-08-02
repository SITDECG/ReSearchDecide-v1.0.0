import React from 'react';
import { GuestAppNavigator } from './navigation/GuestAppNavigator';
import { useUserContext } from "./context/UserContext";
import { Spinner, View, Text } from "native-base";
import { VerifiedAppNavigator } from "./navigation/VerifiedAppNavigator";
import { UnverifiedAppNavigator } from "./navigation/UnverifiedAppNavigator";

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


  if (user && user.emailVerified) {
    return <VerifiedAppNavigator/>
  }

  if (user) {
    return <UnverifiedAppNavigator/>
  }

  return <GuestAppNavigator/>
};

export default App;
