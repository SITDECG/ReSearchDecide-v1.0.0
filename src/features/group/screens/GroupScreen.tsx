import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { VStack, Center } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { GroupName } from '../../../components/GroupName'
import { ElementDiscussion } from '../../../components/ElementDiscussion'
import { useNavigation } from '@react-navigation/native'
import { useTopics } from '../hooks/use-topic'
import { RootStackParamList } from '../../../navigation/types'
import { RouteProp, useRoute } from '@react-navigation/native';

export const GroupScreen = () => {
  // const route = useRoute<RouteProp<RootStackParamList, 'GroupScreen'>>();
  // const param = route.params;
  const navigation = useNavigation();
  const { topics } = useTopics(); 
  // const handlePress = () => {
  //   const params = { topics: topics };
  //   navigation.navigate('AdvancedSearchScreen', params );
  // };
  const handlePress = () => {
    navigation.navigate('AdvancedSearchScreen' as never);
  };
  
  const windowWidth = Dimensions.get('window').width;
  const isWeb = windowWidth >= 768;
  const contentWidth = isWeb ? Math.round(windowWidth * 0.6) : windowWidth;

  return (
    <Center flex={1}>
      <VStack space={0.5} alignItems="center" w={contentWidth}>
        <View>
          {/* <GroupName titles={titles} /> */}
          <GroupName title={"EPN"} id={0}/>
        </View>
        <View >
          <Text style={styles.text}>For more information, click on a topic</Text>
        </View>
        <View>
          {topics.map((title, index) => (
            <ElementDiscussion key={index} title={title.topic} index={index + 1} />
          ))}
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
          <Text style={styles.buttonText}>Combined Search</Text>
        </TouchableOpacity>
      </VStack>
    </Center>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    width: '18%',
    height: '8%',
    paddingTop: 10,
    backgroundColor: '#146C94',
    borderRadius: 6,
  },
  buttonText: {
    color: '#F6F1F1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    color: 'rgba(20, 108, 148, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
