import tw from "twrnc";
import { View, Text } from "native-base";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { getCurrentUser, getUser } from "../../api/user";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../../assets/incons";
import { useUpdatePassword } from "../../hooks/use-change-passwrod";
import { ActivityIndicatorComponent } from "../util/ActivityIndicatorComponent";
import ErrorMessage from "../util/ErrorMessage";

export type EditProfileFormValues = {
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
}

const buildValidationSchema = (changePassword: boolean) => {
  const baseSchema = {
    userName: Yup.string(),
    email: Yup.string().email('Invalid email address'),
  };

  if (changePassword) {
    return Yup.object().shape({
      ...baseSchema,
      password: Yup.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
    });
  }

  return Yup.object().shape(baseSchema);
};

export const EditProfileForm = ({ onSubmit, isLoading }: {
  onSubmit: (values: EditProfileFormValues) => void,
  isLoading: boolean,
}) => {
  const user = getUser();
  const initialValues = {
    userName: user?.displayName || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  };

  const [changePassword, setChangePassword] = useState(false);
  const [updatePassword, isUpdatePasswordLoading, updatePasswordError, isPasswordUpdated] = useUpdatePassword();
  const handleSubmit = async (values: EditProfileFormValues) => {

    if (changePassword) {
      await updatePassword(values.password);
      setChangePassword(false)
      return;
    }
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: buildValidationSchema(changePassword),
  });

  console.log(formik.values);

  return (
      <View style={ [styles.shadow, styles.border, tw.style('p-10 bg-white')] }>

        { isUpdatePasswordLoading && <ActivityIndicatorComponent isLoading={ isUpdatePasswordLoading }/> }
        { updatePasswordError && <ErrorMessage error={ updatePasswordError }/> }
        { isPasswordUpdated && (
            <Text style={ tw`text-green-500 text-center font-bold` }>Password updated successfully!</Text>
        ) }



        <Text style={ tw.style('text-center font-bold text-2xl mb-10') }>Edit Profile</Text>

        <View style={ tw`mb-5` }>
          <View style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded-lg gap-2` }>
            <FontAwesomeIcon icon={ icons.user } style={ styles.icon }/>
            <TextInput
                placeholder="User name"
                onChangeText={ formik.handleChange('userName') }
                onBlur={ formik.handleBlur('userName') }
                value={ formik.values.userName }
                style={ [tw`flex-1`, changePassword ? tw`opacity-50` : tw`opacity-100`] }
                editable={ !changePassword }
            />
          </View>
          { formik.touched.userName && formik.errors.userName && (
              <Text style={ tw`text-red-500` }>{ formik.errors.userName }</Text>
          ) }
        </View>

        <View style={ tw`mb-5` }>
          <View style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded-lg gap-2` }>
            <FontAwesomeIcon icon={ icons.email } style={ styles.icon }/>
            <TextInput
                placeholder="Email"
                onChangeText={ formik.handleChange('email') }
                onBlur={ formik.handleBlur('email') }
                value={ formik.values.email }
                style={ [tw`flex-1`, changePassword ? tw`opacity-50` : tw`opacity-100`] }
                editable={ !changePassword }
            />
          </View>
          { formik.touched.email && formik.errors.email && (
              <Text style={ tw`text-red-500` }>{ formik.errors.email }</Text>
          ) }
        </View>

        { changePassword && (
            <>
              <View style={ tw`mb-5` }>
                <View style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded-lg gap-2` }>
                  <FontAwesomeIcon icon={ icons.password } style={ styles.icon }/>
                  <TextInput
                      placeholder="Password"
                      onChangeText={ formik.handleChange('password') }
                      onBlur={ formik.handleBlur('password') }
                      value={ formik.values.password }
                      style={ tw`flex-1` }
                      secureTextEntry
                  />
                </View>
                { formik.touched.password && formik.errors.password && (
                    <Text style={ tw`text-red-500` }>{ formik.errors.password }</Text>
                ) }
              </View>

              <View style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded-lg gap-2` }>
                <FontAwesomeIcon icon={ icons.password } style={ styles.icon }/>
                <TextInput
                    placeholder="Confirm password"
                    onChangeText={ formik.handleChange('confirmPassword') }
                    onBlur={ formik.handleBlur('confirmPassword') }
                    value={ formik.values.confirmPassword }
                    style={ tw`flex-1` }
                    secureTextEntry
                />
              </View>
              { formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <Text style={ tw`text-red-500` }>{ formik.errors.confirmPassword }</Text>
              ) }
            </>
        ) }

        <TouchableOpacity
            onPress={ () => formik.handleSubmit() }
            disabled={ isLoading }
            style={ [styles.button, tw`p-2 rounded mt-8 mb-2`] }
        >
          <Text
              style={ tw`text-center text-white font-bold` }>{ changePassword ? "Change password" : "Edit profile" }</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={ () => setChangePassword(!changePassword) }
            style={ [styles.changePasswordButton, tw`p-2 rounded my-4`] }
        >
          <Text style={ tw`text-center text-blue-500 font-bold` }>
            { changePassword ? 'Cancel Change Password' : 'Change Password' }
          </Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 20,
    borderWidth: 0,
  },
  button: {
    backgroundColor: '#146C94',
    color: '#fff',
  },
  changePasswordButton: {
    backgroundColor: '#f3f3f3',
  },
  icon: {
    marginStart: 2,
    color: '#9d9d9d',
  },
});
