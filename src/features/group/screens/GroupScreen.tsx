import React, { useEffect, useState } from 'react'
import { VStack, Center } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { GroupName } from '../../../components/GroupName'
import { ElementDiscussion } from '../../../components/ElementDiscussion'
import { useNavigation } from '@react-navigation/native'
import { useTopics } from '../hooks/use-topic'
import { getUser} from '../../../api/user'
import { useMemberVote } from '../hooks/use-member-vote'
import { useGetGroup } from '../../../hooks/use-get-group'
import { Group } from '../../../model/Group'
import { AdvancedSearchScreen } from '../../discussion/screens/AdvancedSearchScreen'
import { DecisionScreen } from '../../decision/screens/DecisionScreen'

export type EditGroupScreenProps = {
  route: {params: {group: Group}};
};
export const GroupScreen = ({ route }: EditGroupScreenProps) => {
  const { group } = route.params;
  console.log('group1', group);
  const navigation = useNavigation();
  const user = getUser(); 
  const { vote } = useMemberVote(user?.uid || '', group.id);
  const [contentWidth, setContentWidth] = useState(Dimensions.get('window').width);

  console.log(vote);
  if (vote?.vote) {
    navigation.navigate('DecisionScreen' as keyof typeof DecisionScreen, { group } as never);
  }

  // const { group } = useGetGroup(vote?.groupId|| '');
  const { topics } = useTopics();
  const handlePress = () => {
    navigation.navigate('AdvancedSearchScreen' as keyof typeof AdvancedSearchScreen, { group } as never);
  };
  
  useEffect(() => {
    const updateContentWidth = () => {
      const windowWidth = Dimensions.get('window').width;
      const isWeb = windowWidth >= 768;
      const newContentWidth = isWeb ? Math.round(windowWidth * 0.6) : windowWidth;
      setContentWidth(newContentWidth);
    };

    Dimensions.addEventListener('change', updateContentWidth);

    return () => {
      // Dimensions.removeEventListener('change', updateContentWidth);
    };
  }, []);

  return (
    <Center flex={1}>
      <VStack space={0.5} alignItems="center" w={contentWidth}>
        <View>
          <GroupName group={group} id={0}/>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    // alignSelf: 'flex-end',
    width: 150,
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
  text: {
    color: 'rgba(20, 108, 148, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
