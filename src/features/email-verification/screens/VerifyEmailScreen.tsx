import { useNavigation } from "@react-navigation/native";
import { Platform, TouchableOpacity, Text, StyleSheet } from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { useSignOut } from "../../../hooks/use-sign-out";
import { useSendVerification } from "../hooks/use-send-verification";
import { View, Center, Heading } from "native-base";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import ErrorMessage from "../../../components/util/ErrorMessage";

const VerifyEmailScreen = () => {
  const isWeb = Platform.OS === 'web';
  const containerStyle = isWeb ? tw`w-40%` : tw`w-90%`;

  const { reload: reloadUser, isLoading: isReloadingUser } = useUserContext();
  const [sendVerification, { isLoading: isResendingVerification }] = useSendVerification();
  const [signOut, { isLoading: isSigningOut }] = useSignOut();
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const handleDonePress = async () => {
    if (!isReloadingUser) {
      await reloadUser();
    }
  };

  const handleResendPress = async () => {
    if (!isResendingVerification) {
      try {
        await sendVerification();
        setIsVerificationSent(true);
      } catch (error) {
        setIsVerificationSent(false);
      }
    }
  };

  const handleCancelPress = async () => {
    if (!isSigningOut) {
      await signOut();
    }
  };

  return (
      <Center flex={ 1 }>
        <View style={ [tw`items-center`, tw`${ containerStyle.toString() }`] }>



          <Heading>Check your email</Heading>
          <Text style={ tw`my-4` }>
            We sent you an email with instructions on how to verify your email
            address. Click on the link in the email to get started.
          </Text>

          { isReloadingUser && <ActivityIndicatorComponent isLoading={ isReloadingUser }/> }
          { isSigningOut && <ActivityIndicatorComponent isLoading={ isSigningOut }/> }
          { isResendingVerification && <ActivityIndicatorComponent isLoading={ isResendingVerification }/> }
          { isVerificationSent && (
              <Text style={ tw`text-green-500` }>Resent verification email</Text>
          ) }


          <View style={ tw`flex justify-center mt-5` }>
            <TouchableOpacity
                onPress={ handleDonePress }
                disabled={ isReloadingUser }
                style={ [styles.button, tw`p-2 rounded my-1`, tw`${ isReloadingUser ? 'opacity-50' : '' }`] }
            >
              <Text style={ tw`text-white text-center` }>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ handleResendPress } disabled={ isResendingVerification }>
              <View
                  style={ [styles.button, tw`p-2 rounded my-1`, tw`${ isReloadingUser ? 'opacity-50' : '' }`] }>
                <Text style={ tw`text-white text-center` }>Resend</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ handleCancelPress } disabled={ isSigningOut }>
              <View style={ [styles.button, tw`p-2 rounded my-1`, tw`${ isReloadingUser ? 'opacity-50' : '' }`] }>
                <Text style={ tw`text-white text-center` }>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Center>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#146C94',
    color: '#fff',
    width: 300,
  }
});