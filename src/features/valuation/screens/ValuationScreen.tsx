import React, { useState, useEffect  } from 'react';
import { VStack, Center } from 'native-base';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { GroupName } from '../../../components/GroupName';
import { ElementValuation } from '../../../components/ElementValuation';
import { useNavigation } from '@react-navigation/native';
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { useTopicsScore } from '../hooks/use-topic-score';
import { useTopicScoreUpdater} from '../hooks/use-topic-score-updater';
import { useUpdateMemberVote } from '../hooks/use-update-member-vote';
import { getUser} from '../../../api/user';
import { useMemberVote } from '../../group/hooks/use-member-vote';
import { useGetGroup } from '../../../hooks/use-get-group'
import { Group } from '../../../model/Group';
import { DecisionScreen } from '../../decision/screens/DecisionScreen';

const ConfirmationModal = ({ visible, message, onConfirm, onCancel }:{visible: any, message: any, onConfirm: any, onCancel: any}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalMessage}>{message}</Text>
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export type EditGroupScreenProps = {
  route: {params: {group: Group}};
};
export const ValuationScreen = ({ route }: EditGroupScreenProps) => {
  const { group } = route.params;
  const navigation = useNavigation();
  const user = getUser(); 
  const { vote } = useMemberVote(user?.uid || '');
  // const { group } = useGetGroup(vote?.groupId|| '');
  const { topics } = useTopicsScore(); 
  const { updateTopicScore } = useTopicScoreUpdater(); 
  const { updateVote } = useUpdateMemberVote();

  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(topics.map((topic) => topic.topic));
  }, [topics]);

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleOpenConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const handleCancel = () => {
    setIsConfirmationVisible(false);
  };

  function keyExtractor(str: string) {
    return str;
  }

  function renderItem(info: DragListRenderItemInfo<string>) {
    const {item, onDragStart, isActive} = info;
    return (
      <TouchableOpacity
        key={item}
        onPressIn={onDragStart}
        >
        <ElementValuation title={item} />
      </TouchableOpacity>
    );
  }

  const handlePress = () => {
    data.map((item, index) => {
      updateTopicScore(item, index);
    });
    setIsConfirmationVisible(false);
    const user = getUser();
    if (user) {
      updateVote(user.uid, true);
    }
    navigation.navigate('DecisionScreen' as keyof typeof DecisionScreen, { group } as never);
  };

  async function onReordered(fromIndex: number, toIndex: number) {
    const finalIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
    const copy = [...data]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(finalIndex, 0, removed[0]); // Now insert at the new pos
    setData(copy);
  }

  const windowWidth = Dimensions.get('window').width;
  const isWeb = windowWidth >= 768;
  const contentWidth = isWeb ? Math.round(windowWidth * 0.6) : windowWidth;
  
  return (
    <Center flex={1}>
    <VStack space={1} >
      <View>
        <GroupName group={group} id={1}/>
      </View>
      <View >
        <Text style={styles.text}>Drag and sort the topics and rate each one.</Text>
      </View>
      <View >
        <DragList
          data={data}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}/>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleOpenConfirmation}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      <ConfirmationModal
        visible={isConfirmationVisible}
        message="Are you sure you want to proceed? This action cannot be undone."
        onConfirm={handlePress}
        onCancel={handleCancel}
      />
    </VStack>
  </Center>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'flex-end',
    width: '16%',
    height: '4%',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    gap: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '49%',
  },
  modalMessage: {
    color: '#424242',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#146C94',
    padding: 10,
    borderRadius: 5,
  },
});
