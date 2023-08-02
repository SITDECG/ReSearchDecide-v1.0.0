import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useFormik } from 'formik';
import { StyleSheet } from 'react-native';
import icons from "../../../assets/incons";
import * as Yup from 'yup';
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export type LoginFormValues = {
  email: string;
  password: string;
};

const buildValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
  });
};

export const LogInForm = ({ onSubmit, buttonText, isLoading }: {
  onSubmit: (values: LoginFormValues) => void,
  buttonText: 'Log in',
  isLoading: boolean
}) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: LoginFormValues) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: buildValidationSchema(),
    onSubmit: handleSubmit,
  });

  return (
      <View>
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

        <TouchableOpacity
            onPress={ () => formik.handleSubmit() }
            disabled={ isLoading }
            style={ [styles.button, tw`p-2 rounded my-5`] }
        >
          <Text style={ tw`text-center text-white font-bold` }>{ buttonText }</Text>
        </TouchableOpacity>
      </View>
  );
};

export default LogInForm;


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#146C94',
    color: '#fff',
  },
  icon: {
    marginStart: 2,
    color: '#9d9d9d',
  }
});
