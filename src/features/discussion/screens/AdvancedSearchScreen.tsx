import React, { useState, useEffect } from 'react'
import { VStack, Center } from 'native-base'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, Dimensions } from 'react-native'
import { GroupName } from '../../../components/GroupName'
import { useTopics } from '../../group/hooks/use-topic'
import { getUser} from '../../../api/user'
import { useMemberVote } from '../../group/hooks/use-member-vote'
import { useGetGroup } from '../../../hooks/use-get-group'
import { Group } from '../../../model/Group'

export type EditGroupScreenProps = {
  route: {params: {group: Group}};
};
export const AdvancedSearchScreen = ({ route }: EditGroupScreenProps) => {
  const { group } = route.params;
  const { topics } = useTopics(); 
  const user = getUser(); 
  const { vote } = useMemberVote(user?.uid || '');
  // const { group } = useGetGroup(vote?.groupId|| '');

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(topics.map((item, index) => ({ id: String(index + 1), title: item.topic, checked: false })));
  }, [topics]);

  const handleCheck = (itemId: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSearch = () => {
    const selectedItems = data.filter((item) => item.checked);
    const query = selectedItems.map((item) => item.title).join('+');
    const url = `https://scholar.google.com/scholar?q=${query}`
    Linking.openURL(url)
  };

  const renderItem = ({ item }: { item: { id: string; title: string; checked: boolean } }) => (
      <View style={styles.containerElement}>
        <TouchableOpacity style={[styles.itemContainer, item.checked ? styles.buttonUp : null]} onPress={() => handleCheck(item.id)}>
        <View style={styles.contentContainer}>
          <Text style={styles.countText}>{item.id}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </View>
        </TouchableOpacity>
    </View>
  );
  const windowWidth = Dimensions.get('window').width;
  const isWeb = windowWidth >= 768;
  const contentWidth = isWeb ? Math.round(windowWidth * 0.6) : windowWidth;

  return (
    <Center flex={1}>
      <VStack space={0.5} alignItems="center" w={contentWidth}>
      <View>
        <GroupName group={group} id={0}/>
      </View>
      <View >
        <Text style={styles.text}>Select more than one topic for more information.</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </VStack>
  </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  containerElement: {
    width: '100%',
    paddingRight: 20,
    borderRadius: 17,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  countText: {
    color: '#146C94',
    fontSize: 16,
    fontWeight: '900',
    wordWrap: 'break-word',
  },
  buttonUp: {
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(25, 167, 206, 0.15)',
    borderRadius: 5,
    justifyContent: 'flex-start',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 8,
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 5,
    paddingRight: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  titleText: {
    color: '#424242',
    fontSize: 20,
    fontWeight: '500',
    wordWrap: 'break-word',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    width: '26%',
    height: '8%',
    paddingTop: 4,
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
});

