import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { VStack, Center } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { GroupName } from '../../../components/GroupName'
import { ElementDiscussion } from '../../../components/ElementDiscussion'
import { useNavigation } from '@react-navigation/native'
import { useTopics } from '../hooks/use-topic'
import { RootStackParamList } from '../../../navigation/types'
import { RouteProp, useRoute } from '@react-navigation/native';

export const GroupScreen = () => {
  // const route = useRoute<RouteProp<RootStackParamList, 'GroupScreen'>>();

  // Obtiene el parámetro enviado desde la pantalla anterior
  // const param = route.params;
  const navigation = useNavigation();
  const { topics } = useTopics(); 
  // const handlePress = () => {
  //   const params = { titles: titles };
  //   navigation.navigate('AdvancedSearchScreen', params );
  // };
  const handlePress = () => {
    navigation.navigate('AdvancedSearchScreen' as never);
  };
  // const titles: string[] = [
  //   'Investigación sobre las causas del aborto',
  //   'Group Recommendation',
  //   'System Recommendation',
  // ];

  return (
    <Center flex={1}>
      <VStack space={1} alignItems="center" w="90%">
        <View>
          {/* <GroupName titles={titles} /> */}
          <GroupName title={"EPN"} />
        </View>
        <View>
          {topics.map((title, index) => (
            <ElementDiscussion key={index} title={title.topic} index={index + 1} />
          ))}
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
          <Text style={styles.buttonText}>Advanced Search</Text>
        </TouchableOpacity>
      </VStack>
    </Center>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'flex-end',
    width: '12%',
    height: '8%',
    paddingTop: 15,
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

// GroupScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
// }
