import React, { useEffect, useState } from 'react'
import { VStack, Center } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { GroupName } from '../../../components/GroupName'
import { useTopicsScore } from '../../valuation/hooks/use-topic-score';

export const DecisionScreen = () => {
  const { topics } = useTopicsScore(); 
  
  const windowWidth = Dimensions.get('window').width;
  const isWeb = windowWidth >= 768;
  const contentWidth = isWeb ? Math.round(windowWidth * 0.6) : windowWidth;

  return (
    <Center flex={1}>
      <VStack space={1} alignItems="center" w={contentWidth}>
        <View>
          <GroupName title={"EPN"} id={2}/>
        </View>
        <View style={styles.container}>
            <View style={styles.containerSectionA}>
                <Text style={styles.title}>Accepted Topics</Text>
            {topics.slice(0, 3).map((title, index) => (
                <Text style={styles.titleText}>{title.topic}</Text>
            ))}
            </View>
            <View style={styles.containerSectionA}>
                <Text style={styles.title}>Rejected Topics</Text>
            {topics.slice(-3).map((title, index) => (
                <Text style={styles.titleText}>{title.topic}</Text>
            ))}
            </View>
        </View>
      </VStack>
    </Center>
  )
}

const styles = StyleSheet.create({
    container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    },
    containerSectionA: {
        flex: 0.75,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
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
})
