import React, { useEffect, useState } from 'react'
import { VStack, Center } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { GroupName } from '../../../components/GroupName'
import { useTopicsScore } from '../../valuation/hooks/use-topic-score'
import { useNavigation } from '@react-navigation/native'
import { Group } from '../../../model/Group'
import { TopicScore } from '../../../model/TopicScore'

export type EditGroupScreenProps = {
  route: {params: {group: Group}};
};
export const DecisionScreen = ({ route }: EditGroupScreenProps) => {
  const { group } = route.params;
  const navigation = useNavigation();
  const { topics } = useTopicsScore(); 
  const [contentWidth, setContentWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateContentWidth = () => {
      const windowWidth = Dimensions.get('window').width;
      setContentWidth(windowWidth);
    };

    Dimensions.addEventListener('change', updateContentWidth);

    return () => {
      // Dimensions.removeListener('change', updateContentWidth);
    };
  }, []);
  
  const handlePress = () => {
    navigation.navigate('Home' as never);
  }

  return (
    <Center flex={1}>
      <VStack space={1} alignItems="center" w={contentWidth}>
        <View>
          <GroupName group={group} id={2}/>
        </View>
        <View style={styles.container}>
            <View style={styles.containerSectionA}>
                <Text style={styles.title}>Accepted Topics</Text>
                <Text style={styles.text}>These are the topics that members have ranked highest.</Text>
            {topics.slice(0, 3).map((topic, index) => (
              <View key={topic.id}>
                <Text style={styles.titleText}>{topic.topic}</Text>
                <View style={styles.containerSectionB}>
                  {topic.attractive || topic.novel || topic.trend || topic.obsolete || topic.unfamiliar ? (
                    <Text>This topic has been called </Text>
                  ) : null}
                  {topic.attractive && <Text>Attractive, </Text>}
                  {topic.novel && <Text>Novel, </Text>}
                  {topic.trend && <Text>Trend, </Text>}
                  {topic.obsolete && <Text>Obsolete, </Text>}
                  {topic.unfamiliar && <Text>Unfamiliar</Text>}
                </View>
              </View>
            ))}

            </View>
            <View style={styles.containerSectionA}>
                <Text style={styles.title}>Rejected Topics</Text>
                <Text style={styles.text}>These are the topics that members have ranked lowest.</Text>
            {topics.slice(-3).map((topic, index) => (
              <View key={topic.id}>
                <Text style={styles.titleText}>{topic.topic}</Text>
                <View style={styles.containerSectionB}>
                {topic.attractive || topic.novel || topic.trend || topic.obsolete || topic.unfamiliar ? (
                    <Text>This topic has been called </Text>
                  ) : null}
                  {topic.attractive && <Text>Attractive, </Text>}
                  {topic.novel && <Text>Novel, </Text>}
                  {topic.trend && <Text>Trend, </Text>}
                  {topic.obsolete && <Text>Obsolete, </Text>}
                  {topic.unfamiliar && <Text>Unfamiliar</Text>}
                </View>
              </View>
            ))}
            </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </VStack>
    </Center>
  )
}

const styles = StyleSheet.create({
    container: {
    width: '100%',
    alignItems: 'center',
    },
    containerSectionB: {
      position: 'relative',
      flexDirection: 'row',
    },
    containerSectionA: {
        flex: 0.75,
        position: 'relative',
        alignItems: 'flex-start',
        paddingTop: 15,
      },
    titleText: {
    color: '#424242',
    fontSize: 20,
    fontWeight: '500',
    },
    title: {
    color: '#424242',
    fontSize: 25,
    fontWeight: '500',
    },
  text: {
    color: 'rgba(20, 108, 148, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    // alignSelf: 'flex-end',
    width: 60,
    height: 30,
    backgroundColor: '#146C94',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#F6F1F1',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
