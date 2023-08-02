import React from 'react';
import { View, Text, Link } from 'native-base';
import tw from 'twrnc';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useLogIn } from "../hooks/use-log-in";
import LogInForm, { LoginFormValues } from "../../../components/forms/LogInForm";
import { useNavigation } from '@react-navigation/native';
import { SignUpScreen } from "../../sign-up/screens/SignUpScreen";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import ErrorMessage from "../../../components/util/ErrorMessage";
import { ForgotPasswordScreen } from "../../forgot-password/screens/ForgotPasswordScreen";

export const LogInScreen = () => {

  const navigation = useNavigation();

  const handleLinkPressOnSignUp = () => {
    navigation.navigate('SignUpScreen' as keyof typeof SignUpScreen);
  };

  const [logIn, { isLoading, error }] = useLogIn();

  const handleLogIn = async (values: LoginFormValues) => {
    try {
      await logIn(values);
    } catch (e) {
      console.log(error);
    }
  }

  function handleLinkPressOnForgotPassword() {
    navigation.navigate('ForgotPasswordScreen' as keyof typeof ForgotPasswordScreen);
  }

  return (
      <View
          style={ [
            styles.shadow, styles.border,
            tw.style('py-7 px-5 bg-white')
          ] }
      >
        { isLoading && <ActivityIndicatorComponent isLoading={ isLoading }/> }
        { error && <ErrorMessage error={ error }/> }
        <Text style={ tw.style('text-center font-bold text-2xl mb-10') }>
          Log In
        </Text>
        <LogInForm onSubmit={ handleLogIn } buttonText={ "Log in" } isLoading={ isLoading }/>

        <View style={ tw`flex flex-row justify-center mt-5` }>
          <Text style={ tw`text-gray-500` }>Forgot your </Text>
          <TouchableOpacity
              onPress={ handleLinkPressOnForgotPassword }
          >
            <Text style={ tw.style('text-blue-500') }>Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={ tw`flex flex-row justify-center mt-5` }>
          <Text style={ tw`text-gray-500` }>Don't have an account? </Text>
          <TouchableOpacity onPress={ handleLinkPressOnSignUp }>
            <Text style={ tw.style('text-blue-500') }>Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
  );
}

export default LogInScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 30,
    blurRadius: 50,

  },
  border: {
    borderRadius: 40,
    borderWidth: 0,
  }
});