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
import { Topic } from '../../../api/topicInterface';

export const ValuationScreen = () => {
  const navigation = useNavigation();
  const { topics, updateTopic} = useTopics();
  const [data, setData] = useState(topics);

  useEffect(() => {
    setData(topics);
  }, [topics]);

  // const renderItem = ({ item, ...rest }: ReorderableListRenderItemInfo<Topic>) => (
  //   <ElementValuation key={item.id} title={item.topic} index={rest.index + 1} />
  // );

  const renderItem = ({ item, drag, isActive  }: RenderItemParams<Topic>) => (
    <ElementValuation key={item.id} title={item.topic} index={data.findIndex((topic) => topic.id === item.id) + 1} drag={drag} />
  );

  // const handleReorder = ({ fromIndex, toIndex }: ReorderableListReorderEvent) => {
  //   const newData = [...data];
  //   newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
  //   setData(newData);
  // };

  const handleReorder = ({ data }: { data: Topic[] }) => {
    setData(data);
  };

  const handleSaveOrder = () => {
    const newOrder = data.map((item) => item.id);
    updateTopic(newOrder);
  };

  return (
    <Center flex={1}>
      <VStack space={1} alignItems="center" w="90%">
        <View>
          <GroupName />
        </View>
        {/* <ReorderableList
          data={data}
          onReorder={handleReorder}
          renderItem={renderItem}
          keyExtractor={(item: Topic) => item.id}
          dragHandlerStyle={styles.dragHandler}
          containerStyle={styles.container}
          listStyle={styles.list}
          dragItemOverflow={true}
        /> */}
        <DraggableFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: Topic) => item.id}
          onDragEnd={handleReorder}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSaveOrder}>
          <Text style={styles.buttonText}>Save Order</Text>
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
