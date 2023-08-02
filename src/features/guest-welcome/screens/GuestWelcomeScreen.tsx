import React, { FC } from 'react';
import { VStack, Center, Button, Text, Heading, Box, HStack, View } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/types';

import { GuestLayout } from "../../../components/layout/GuestLayout";
import { LogInScreen } from "../../log-in/screens/LogInScreen";
import { AppBanner } from "../../../components/util/AppBanner";
import { Platform } from 'react-native';
import tw from "twrnc";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'GuestWelcome'>;
};

export const GuestWelcomeScreen: FC<Props> = ({ navigation }) => {
  const handlePressOnSignIn = () => {
    navigation.navigate('SignIn');
  };

  const isWeb = Platform.OS === 'web';

  return (
      <GuestLayout>
        { isWeb ? (
            <HStack
                alignItems="center"
                justifyContent="space-around"
                space={ 10 }
                style={ tw`w-full h-full mt-5 px-10` }
            >
              <View flex={ 2 }>
                <AppBanner/>
              </View>
              <View flex={ 1 }>
                <LogInScreen/>
              </View>
            </HStack>
        ) : (
            <View>
              <AppBanner/>
              <LogInScreen/>
            </View>
        ) }
      </GuestLayout>
  );
};
