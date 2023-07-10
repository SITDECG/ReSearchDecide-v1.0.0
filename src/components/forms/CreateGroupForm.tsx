import { GroupItem } from "../../model/GroupItem";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { View, Text, FlatList } from "native-base";
import tw from "twrnc";
import { TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../../assets/incons";
import React from "react";
import UserListComponent from "../UserListComponent";
import { User } from "../../model/User";

export type CreateGroupFormValues = {
  group: GroupItem
}

const buildValidationSchema = () => {
  return Yup.object().shape({
    group: Yup.object().shape({
      name: Yup.string()
          .required('Name is required'),

      description: Yup.string()
          .required('Description is required'),
      adminName: Yup.string()
          .required('Admin name is required'),
    })
  });

}

export const CreateGroupForm = ({ onSubmit, buttonText, isLoading }: {
  onSubmit: (values: CreateGroupFormValues) => void,
  buttonText: 'Create group',
  isLoading: boolean
}) => {

  const initialValues = {
    group: {
      id: 0,
      name: '',
      description: '',
      adminName: ''
    }
  };

  const handleSubmit = (values: CreateGroupFormValues) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: buildValidationSchema(),
  });

  console.log(formik.values.group)
  return (
      <View>
        <View style={ tw`flex gap-4 bg-white py-3 px-2 mb-6` }>
          <View
              style={ tw` flex flex-row items-center bg-gray-100 p-1 pl-3 rounded gap-2 h-13` }
          >
            <FontAwesomeIcon icon={ icons.peopleGroup } style={ styles.icon } size={ 25 }/>
            <TextInput
                placeholder="GROUP NAME"
                onChangeText={ formik.handleChange('group.name') }
                onBlur={ formik.handleBlur('group.name') }
                value={ formik.values.group.name }
                style={ tw`flex-1 text-lg` }
            />
          </View>
          { formik.touched.group?.name && formik.errors.group?.name && (
              <Text style={ tw`text-red-500 mb-3` }>{ formik.errors.group.name }</Text>
          ) }

          <View
              style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded gap-2 ` }
          >
            <TextInput
                placeholder="Description..."
                onChangeText={ formik.handleChange('group.description') }
                onBlur={ formik.handleBlur('group.description') }
                value={ formik.values.group.description }
                style={ tw`flex-1` }
            />
          </View>
          { formik.touched.group?.description && formik.errors.group?.description && (
              <Text style={ tw`text-red-500` }>{ formik.errors.group.description }</Text>
          ) }

        </View>
        <View style={ [styles.shadow, styles.border, tw.style('py-3 px-5 mx-5 bg-white')] }>
          <Text style={ tw`text-xl font-bold mb-2` }>Members</Text>

          <TouchableOpacity
              style={ [tw`rounded my-3`, styles.button] }
          >
            <View style={ tw`flex-row items-center gap-2` }>
              <FontAwesomeIcon icon={ icons.add } style={ tw`text-white` }/>
              <Text style={ tw`text-white` }>Add members</Text>
            </View>
          </TouchableOpacity>

          <View style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded gap-2` }>
            <FontAwesomeIcon icon={ icons.search } style={ styles.icon }/>
            <TextInput placeholder="Search..." style={ tw`flex-1` }/>
          </View>


          <UserListComponent users={ data }/>

        </View>
        {/*<View style={[tw`flex justify-center items-center my-5`]}>*/ }
        {/*  <TouchableOpacity*/ }
        {/*      style={[tw`rounded bg-green-300 w-70`, styles.buttonCreateGroup, styles.shadow]}*/ }
        {/*      onPress={() => formik.handleSubmit()}*/ }
        {/*  >*/ }
        {/*    <Text style={tw`text-gray-600 font-bold`}>{buttonText}</Text>*/ }
        {/*  </TouchableOpacity>*/ }
        {/*</View>*/ }

      </View>

  );
}

const styles = {
  container: tw`flex-1 justify-center items-center`,
  icon: tw`text-gray-500`,
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
    borderRadius: 15,
    borderWidth: 0,
  },

  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#146C94'
  },
  buttonCreateGroup: {
    alignItems: 'center',
    padding: 10,
  }
}

const data: User[] = [
  {
    id: 1,
    name: 'John Doe',
    lastName: 'Doe',
  },
  {
    id: 2,
    name: 'John Doe',
    lastName: 'Doe',
  },
  {
    id: 3,
    name: 'John Doe',
    lastName: 'Doe',
  }
]
