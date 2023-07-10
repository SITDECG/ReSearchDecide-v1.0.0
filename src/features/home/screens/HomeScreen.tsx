import React from 'react'
import PropTypes from 'prop-types'
import { VStack, Center, Heading, Button, View, Text } from 'native-base'
import { useUserContext } from '../../../context/UserContext'
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedLayout } from "../../../components/layout/AuthenticatedLayout";
import { GroupListScreen } from "../../create-group/screens/GruopListScreen";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../../../assets/incons";
import { StyleSheet } from "react-native";

export const HomeScreen = () => {

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CreateGroupScreen' as never);
  };

  return (
      <AuthenticatedLayout>
        <Text style={ tw`text-2xl font-medium text-center` }>Groups</Text>
        <TouchableOpacity
            style={ [tw`rounded mb-7`, styles.button] }
            onPress={ handlePress }
        >
          <View style={ tw`flex-row items-center gap-2` }>
            <FontAwesomeIcon style={ tw`text-white` } icon={ icons.add }/>
            <Text style={ tw`text-white` }>Add Group</Text>
          </View>
        </TouchableOpacity>
        <GroupListScreen/>
      </AuthenticatedLayout>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}


const styles = StyleSheet.create({

  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#146C94'
  },

});