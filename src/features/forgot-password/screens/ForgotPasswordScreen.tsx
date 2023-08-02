import React, { useState } from 'react';
import { Center, VStack, Text, View } from 'native-base';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types/types';
import { useNavigation } from '@react-navigation/native';
import { SignUpScreen } from '../../sign-up/screens/SignUpScreen';
import { EmailForm, EmailFormValues } from '../../../components/forms/EmailForm';
import ErrorMessage from '../../../components/util/ErrorMessage';
import { useSendPasswordReset } from '../hooks/use-forgot-password';
import tw from 'twrnc';
import { Platform, TouchableOpacity } from 'react-native';
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  const handleLinkPressOnSignUp = () => {
    navigation.navigate('SignUpScreen' as keyof typeof SignUpScreen);
  };

  const [sendPasswordReset, { isLoading, error }] = useSendPasswordReset();
  const [isEmailSent, setIsEmailSent] = useState(false); // Estado para controlar si se ha enviado el correo

  const handlePasswordReset = async (values: EmailFormValues) => {
    try {
      await sendPasswordReset(values.email);
      setIsEmailSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  const isWeb = Platform.OS === 'web';
  const containerStyle = isWeb ? tw`w-40%` : tw`w-90%`;

  return (
      <View style={ tw`flex-1 items-center bg-white mt-6` }>
        <View style={ containerStyle }>
          <Text style={ tw`text-center py-3 text-blue-500` }>
            Please, enter your email address. You will receive a link to create a new password via email.
          </Text>
          { isLoading && <ActivityIndicatorComponent isLoading={ isLoading }/> }
          { isEmailSent && !error && (
              <Text style={ tw`text-center text-green-500 py-3` }>Email sent successfully!</Text>) }
          { error && <ErrorMessage error={ error }/> }
          <EmailForm onSubmit={ handlePasswordReset } isLoading={ isLoading }/>
        </View>

        <View style={ tw`flex flex-row justify-center mt-8` }>

          <Text style={ tw`text-gray-500` }>Don't have an account? </Text>
          <TouchableOpacity onPress={ handleLinkPressOnSignUp }>
            <Text style={ tw.style('text-blue-500') }>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
  );
};
