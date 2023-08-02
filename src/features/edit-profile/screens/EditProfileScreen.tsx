import { View, Text } from "native-base";
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { getCurrentUser } from "../../../api/user";
import tw from "twrnc";
import { AppBanner } from "../../../components/util/AppBanner";
import React, { useState } from "react";
import { Platform } from "react-native";
import { EditProfileForm, EditProfileFormValues } from "../../../components/forms/EditProfileForm";
import { useUpdateDisplayName } from "../hooks/use-change-displayname";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import ErrorMessage from "../../../components/util/ErrorMessage";

export const EditProfileScreen = () => {
  const user = getCurrentUser();
  const isWeb = Platform.OS === 'web';
  const textSize = isWeb ? 'text-5xl' : 'text-3xl';
  const textSizeSub = isWeb ? 'text-4xl' : 'text-2xl';
  const textCenter = isWeb ? '' : 'text-center';

  const [displayNameChanged, setDisplayNameChanged] = useState(false); // Estado para controlar el mensaje de cambio exitoso
  const [updateDisplayName, isLoading, error] = useUpdateDisplayName();

  const handleEditProfileSubmit = async (values: EditProfileFormValues) => {
    await updateDisplayName(values.userName);
    setDisplayNameChanged(true);
  };

  return (
      <GuestLayout>
        { isWeb ? (
            <View style={ tw`flex-row items-center justify-around w-full h-full mt-5 px-10 ` }>
              <View style={ { flex: 1 } }>
                <Text style={ tw`${ textCenter } font-bold mb-3 ${ textSize }` }>{ user?.displayName }</Text>
                <Text
                    style={ tw`${ textCenter } font-medium text-gray-500 mb-10 ${ textSizeSub }` }>{ user?.email }</Text>
              </View>
              <View style={ { flex: 1 } }>
                { isLoading && <ActivityIndicatorComponent isLoading={ isLoading }/> }
                { error && <ErrorMessage error={ error }/> }
                { displayNameChanged && (
                    <Text style={ tw`text-green-500 font-bold mb-2 text-center` }>User name updated
                      successfully!</Text>
                ) }
                <EditProfileForm onSubmit={ handleEditProfileSubmit } isLoading={ false }/>
              </View>
            </View>
        ) : (
            <View>
              <AppBanner/>
            </View>
        ) }
      </GuestLayout>
  );
};
