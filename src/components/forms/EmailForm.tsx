import React from 'react'
import { VStack, FormControl, Input, Button, Text, View } from 'native-base'
import { useFormik, getIn, FormikErrors, FormikTouched } from 'formik'
import * as Yup from 'yup'
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../../assets/incons";

export type EmailFormValues = {
  email: string
}

const buildValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });
}


export const EmailForm = ({ isLoading, onSubmit }: {
  isLoading: boolean,
  onSubmit: (values: EmailFormValues) => void,
}) => {
  const initialValues = {
    email: '',
  }

  const handleSubmit = (values: EmailFormValues) => {
    onSubmit(values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: buildValidationSchema(),
  });

  return (
      <View style={ [
        styles.shadow, styles.border,
        tw.style('py-7 px-5 bg-white mt-1')
      ] }>
        <View style={ tw`mb-5` }>
          <View style={ tw`flex flex-row items-center bg-gray-100 p-2 pl-3 rounded-lg gap-2` }>
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
        <TouchableOpacity
            onPress={ () => formik.handleSubmit() }
            disabled={ isLoading }
            style={ [styles.button, tw`p-2 rounded my-4`] }
        >
          <Text style={ tw`text-center text-white font-bold` }> Reset password </Text>
        </TouchableOpacity>
      </View>
  )
}
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
  icon: {
    marginStart: 2,
    color: '#9d9d9d',
  }
});