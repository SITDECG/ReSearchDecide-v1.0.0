import React, { useState, useEffect  } from 'react';
import PropTypes from 'prop-types';
import { VStack, Center } from 'native-base';
import { View, Text, StyleSheet, TouchableOpacity,Pressable } from 'react-native';
import { GroupName } from '../../../components/GroupName';
import { ElementValuation } from '../../../components/ElementValuation';
import { useNavigation } from '@react-navigation/native';
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { SwipeListView } from 'react-native-swipe-list-view';
import { List, arrayMove } from 'react-movable';
import ReorderableList, {
  ReorderableListRenderItemInfo,
  ReorderableListReorderEvent,
} from 'react-native-reorderable-list';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { ElementSearch } from '../../../components/ElementSearch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTopics } from '../../group/hooks/use-topic';
import { Topic } from '../../../model/Topic';
const title: string[] = [
  'Knee rehabilitation',
  'NFC System',
  'Substrate integrated waveguide',
];
export const ValuationScreen = () => {
  const { topics } = useTopics(); 
  const [titles, setTitles] = useState<string[]>([]);
  const [data, setData] = useState(title);
  useEffect(() => {
    setTitles(topics.map((topic) => topic.topic));
  }, [topics]);

  function keyExtractor(str: string) {
    return str;
  }

  function renderItem(info: DragListRenderItemInfo<string>) {
    const {item, onDragStart, onDragEnd, isActive} = info;

    return (
      <TouchableOpacity
        key={item}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}>
        <ElementValuation title={item}  />
      </TouchableOpacity>
    );
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...data]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setData(copy);
  }

  return (
    
    <Center flex={1}>
    <VStack space={1} alignItems="center" w="90%">
      <View>
        <GroupName title={"EPN"} />
      </View>
      <View>
        <DragList
          data={data}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}/>
      </View>
      <TouchableOpacity style={styles.buttonContainer} >
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
    </VStack>
  </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  list: {
    flex: 1,
  },
  dragHandler: {
    paddingVertical: 12,
    paddingLeft: 10,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    width: '12%',
    height: '8%',
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
});


// ValuationScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
//   route: PropTypes.array.isRequired,
// }
