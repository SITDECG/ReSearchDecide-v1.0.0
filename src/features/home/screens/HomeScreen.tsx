import React from 'react';
import PropTypes from 'prop-types';
import { VStack, Center, Heading, Button, View, Text } from 'native-base';
import { useUserContext } from '../../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { AuthenticatedLayout } from '../../../components/layout/AuthenticatedLayout';
import { GroupListScreen } from '../../create-group/screens/GruopListScreen';
import tw from 'twrnc';
import { TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import icons from '../../../../assets/incons';
import { StyleSheet } from 'react-native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CreateGroupScreen' as never);
  };

  const windowWidth = Dimensions.get('window').width;
  const isWeb = windowWidth >= 768;
  const contentWidth = isWeb ? Math.round(windowWidth * 0.6) : windowWidth;

  return (
      <AuthenticatedLayout>
        <View style={ [styles.container, isWeb && { width: contentWidth }] }>
            <Text style={ tw`text-2xl font-medium  mb-4` }>Groups</Text>
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
          </View>
      </AuthenticatedLayout>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
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
  content: {},
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#146C94',
  },
});
