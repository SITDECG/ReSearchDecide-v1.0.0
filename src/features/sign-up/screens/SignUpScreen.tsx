import React from 'react';
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { AppBanner } from "../../../components/util/AppBanner";
import SignUpForm from "../../../components/forms/SignUpForm";
import { ScrollView } from "native-base";
import { Platform, StyleSheet, View } from "react-native";
import { useSignUp } from "../hooks/use-sign-up";
import tw from "twrnc";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import ErrorMessage from "../../../components/util/ErrorMessage";

export const SignUpScreen = () => {
  const [signUp, { isLoading, error }] = useSignUp();
  const isWeb = Platform.OS === 'web';

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <GuestLayout>
          {isWeb ? (
              <View style={tw`flex-row items-center justify-around w-full h-full mt-5 px-10 `}>
                <View style={{ flex: 2 }}>
                  <AppBanner />
                </View>
                <View style={{ flex: 1 }}>
                  { isLoading && <ActivityIndicatorComponent isLoading={ isLoading }/> }
                  { error && <ErrorMessage error={ error }/> }
                  <SignUpForm onSubmit={signUp} buttonText={'Create account'} isLoading={isLoading} />
                </View>
              </View>
          ) : (
              <View>
                <AppBanner />
                <SignUpForm onSubmit={signUp} buttonText={'Create account'} isLoading={isLoading} />
              </View>
          )}
        </GuestLayout>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
