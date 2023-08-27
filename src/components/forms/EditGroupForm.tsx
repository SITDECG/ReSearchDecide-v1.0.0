import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, Alert, Modal } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import icons from '../../../assets/incons';
import tw from 'twrnc';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserListComponent from '../UserListComponent';
import { Group } from "../../model/Group";
import { useUsers } from "../../hooks/use-users";
import { ScrollView } from "native-base";
import MembersListComponent from "../MembersListComponent";
import { useDeleteGroup } from "../../features/edit-group/hooks/use-delete-group";
import { useNavigation } from "@react-navigation/native";
import { EditGroupScreen } from "../../features/edit-group/screens/EditGroupScreen";
import { HomeScreen } from "../../features/home/screens/HomeScreen";

export type EditGroupFormValues = {
  group: Group;
};

const buildValidationSchema = () => {
  return Yup.object().shape({
    group: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
    }),
  });
};

export const EditGroupForm = ({ onSubmit, buttonText, isLoading, group }: {
  onSubmit: any,
  buttonText: string,
  isLoading: boolean,
  group: Group
}) => {
  console.log('groupEdit', group);
  const navigation = useNavigation();

  const initialValues = {
    group: {
      id: group.id,
      name: group.name,
      description: group.description,
    },
  };
  const handleSubmit = (values: EditGroupFormValues) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: buildValidationSchema(),
  });

  const windowWidth = Dimensions.get('window').width;
  const isWeb = windowWidth >= 768;
  const contentWidth = isWeb ? Math.round(windowWidth * 0.6) : windowWidth;

  const [modalVisible, setModalVisible] = useState(false);
  const users = useUsers();
  const isGroupCreated = group.id !== '';

  const [isMembersAdded, setMembersAdded] = useState(false);

  const handleMembersAdded = () => {
    setMembersAdded(true);
    setModalVisible(false);
  };

  const { deleteGroup } = useDeleteGroup();

  const handleDeleteClick = async () => {
    try {
      await deleteGroup(group.id);
      navigation.navigate('Home' as never);
      console.log("Group deleted successfully");

    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
      <View style={ [styles.container, isWeb && { width: contentWidth }] }>
        <View style={ tw`flex gap-4 bg-white py-3 px-2 mb-6` }>
          <View style={ tw`flex flex-row items-center bg-gray-100 p-1 pl-3 rounded gap-2 h-13` }>
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
              <Text style={ tw`text-red-500 mb-1` }>{ formik.errors.group.name }</Text>
          ) }

          <View style={ tw`flex flex-row items-center bg-gray-100 p-2 pl-3 rounded gap-2` }>
            <TextInput
                placeholder="Description..."
                onChangeText={ formik.handleChange('group.description') }
                onBlur={ formik.handleBlur('group.description') }
                value={ formik.values.group.description }
                style={ tw`flex-1` }
            />
          </View>
          { formik.touched.group?.description && formik.errors.group?.description && (
              <Text style={ tw`text-red-500` }>{ formik.errors.group.description } </Text>
          ) }

          <TouchableOpacity
              style={ [tw`rounded mt-2 mb-1`, styles.button] }
              onPress={ () => formik.handleSubmit() }
          >
            <View style={ tw`flex-row items-center gap-2` }>
              <FontAwesomeIcon icon={ icons.edit } style={ tw`text-white` }/>
              <Text style={ tw`text-white` }>{ buttonText }</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
              style={ [tw`rounded`, styles.buttonDelete] }
              onPress={ () => handleDeleteClick() }
          >
            <View style={ tw`flex-row items-center gap-2` }>
              <FontAwesomeIcon icon={ icons.trash } style={ tw`text-white` }/>
              <Text style={ tw`text-white` }>Delete group</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={ styles.membersContainer }>
          <View style={ [isWeb && { width: 400 }, !isWeb && tw`w-full`] }>
            <View style={ [styles.shadow, styles.border, tw.style('py-3 px-5 bg-white')] }>
              <TouchableOpacity
                  style={ [tw`rounded my-3`, styles.button, isGroupCreated ? null : styles.disabledButton] }
                  onPress={ () => setModalVisible(true) }
                  disabled={ !isGroupCreated } // Desactiva el botón si el grupo no ha sido creado
              >
                <View style={ tw`flex-row items-center gap-2` }>
                  <FontAwesomeIcon icon={ icons.add } style={ tw`text-white` }/>
                  <Text style={ tw`text-white` }>Add member</Text>
                </View>
              </TouchableOpacity>

              <ScrollView style={ tw`w-full` }>
                <View style={ tw`w-full` }>
                  <Text style={ tw`text-xl font-bold my-4 text-center` }>User list</Text>
                  { isGroupCreated && (<MembersListComponent group={ group }/>) }
                </View>
              </ScrollView>

            </View>
          </View>
        </View>

        <Modal
            animationType="slide"
            transparent={ true }
            visible={ modalVisible }
            onRequestClose={ () => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            } }>
          <View style={ styles.centeredView }>
            <View style={ [styles.modalView, isWeb && { width: contentWidth }] }>

              <TouchableOpacity
                  style={ {
                    ...tw.style('rounded-full bg-red-500'),
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                  } }
                  onPress={ () => setModalVisible(!modalVisible) }>
                <FontAwesomeIcon icon={ icons.close } style={ tw`text-white` } size={ 10 }/>
              </TouchableOpacity>
              <ScrollView style={ tw`w-full` }>
                <View style={ tw`w-full` }>
                  <Text style={ tw`text-xl font-bold my-4 text-center` }>User list</Text>
                  <UserListComponent users={ users } groupId={ group.id } onMembersAdded={ handleMembersAdded }/>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 30,
    blurRadius: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 20,
    height: '100%',

  },
  icon: {
    color: '#000',
  },
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
    backgroundColor: '#146C94',
  },
  buttonDelete: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF0000',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC', // Cambiar por el color deseado para el botón deshabilitado
  },
  membersContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: '100%',
    backgroundColor: 'rgba(51,51,51,0.5)',
  },
  modalView: {
    width: '100%',
    height: '81%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});



