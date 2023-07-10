import React, { FC } from 'react';
import { VStack, Center, Button, Text, Heading, Box, HStack, View } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/types';

import tw from 'twrnc'
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { LogInScreen } from "../../log-in/screens/LogInScreen";
import { AppBanner } from "../../../components/util/AppBanner";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'GuestWelcome'>;
};

export const GuestWelcomeScreen: FC<Props> = ({ navigation }) => {
  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
      <GuestLayout>
        <View>
          <AppBanner/>
          <LogInScreen/>
        </View>
      </GuestLayout>
  );
};



