import React from 'react'
import PropTypes from 'prop-types'
import { VStack, Center } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { GroupName } from '../../../components/GroupName'
import { ElementSearch } from '../../../components/ElementSearch'
import { useNavigation, useRoute } from '@react-navigation/native'

interface RouteParams {
  titles: string[];
}

export const AdvancedSearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const { titles} = route.params as RouteParams;
  const handlePress = () => {
    navigation.navigate('ValuationScreen' as never);
  };
  const titles: string[] = [
    'Investigación sobre las causas del aborto',
    'Group Recommendation',
    'System Recommendation',
  ];

  return (
    <Center flex={1}>
      <VStack space={1} alignItems="center" w="90%">
        <View>
          <GroupName />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          {/* {titles.map((title, index) => (
            <ElementSearch key={index} title={title} index={index + 1} />
          ))} */}
        </View>
      </VStack>
    </Center>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    // alignSelf: 'flex-center',
    width: '10%',
    height: '10%',
    padding: 2,
    backgroundColor: '#146C94',
    borderRadius: 6,
  },
  buttonText: {
    color: '#F6F1F1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
AdvancedSearchScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  // route: PropTypes.shape({
  //   params: PropTypes.shape({
  //     titles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  //   }).isRequired,
  // }).isRequired,
}
// AdvancedSearchScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
//   route: PropTypes.array.isRequired,
// }
