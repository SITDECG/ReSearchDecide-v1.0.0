import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useFormik } from 'formik';
import { StyleSheet } from 'react-native';
import icons from "../../../assets/incons";
import * as Yup from 'yup';
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export type SignUpFormValues = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const buildValidationSchema = () => {
  return Yup.object().shape({
    userName: Yup.string()
        .required('Name is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),

    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

};

export const SignUpForm = ({ onSubmit, buttonText, isLoading }: {
  onSubmit: (values: SignUpFormValues) => void,
  buttonText: 'Create account',
  isLoading: boolean
}) => {
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: SignUpFormValues) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: buildValidationSchema(),
  });

  console.log(formik.values);

  return (
      <View style={ [
        styles.shadow, styles.border,
        tw.style('py-7 px-5 bg-white mt-1')
      ] }>


        <Text style={ tw.style('text-center font-bold text-2xl mb-10') }>
          Sign Up
        </Text>

        <View style={ tw`mb-5` }>
          <View style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded-lg gap-2` }>
            <FontAwesomeIcon icon={ icons.user } style={ styles.icon }/>
            <TextInput
                placeholder="User name"
                onChangeText={ formik.handleChange('userName') }
                onBlur={ formik.handleBlur('userName') }
                value={ formik.values.userName }
                style={ tw`flex-1` }
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
                style={ tw`flex-1` }
            />
          </View>
          { formik.touched.email && formik.errors.email && (
              <Text style={ tw`text-red-500` }>{ formik.errors.email }</Text>
          ) }
        </View>

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

        <TouchableOpacity
            onPress={ () => formik.handleSubmit() }
            disabled={ isLoading }
            style={ [styles.button, tw`p-2 rounded my-8`] }
        >
          <Text style={ tw`text-center text-white font-bold` }>{ buttonText }</Text>
        </TouchableOpacity>
      </View>
  );
};

export default SignUpForm;


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
  button: {
    backgroundColor: '#146C94',
    color: '#fff',
  },
  icon: {
    marginStart: 2,
    color: '#9d9d9d',
  }
});