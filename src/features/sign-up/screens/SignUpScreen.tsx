import React from 'react';
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { AppBanner } from "../../../components/util/AppBanner";
import SignUpForm from "../../../components/forms/SignUpForm";
import { ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { useSignUp } from "../hooks/use-sign-up";

export const SignUpScreen = () => {

  const [signUp, {isLoading, error}] = useSignUp();

  return (
      <ScrollView contentContainerStyle={ styles.container }>
        <GuestLayout>
          <AppBanner></AppBanner>
          <SignUpForm onSubmit={ signUp } buttonText={ 'Create account' } isLoading={ isLoading }></SignUpForm>
        </GuestLayout>
      </ScrollView>
  );
};

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
  },
  container: {
    flexGrow: 1,
  },
});

