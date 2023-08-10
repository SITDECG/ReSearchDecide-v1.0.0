import { View, Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { Group } from "../model/Group";
import { useNavigation } from "@react-navigation/native";
import { GroupScreen } from "../features/group/screens/GroupScreen";

export type GroupItemProps = {
  group: Group,
  onPress?: () => void,
  isSelected?: boolean
}

export const GroupItemComponent = ({ group, onPress, isSelected }: GroupItemProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('GroupScreen' as keyof typeof GroupScreen);
  }

  const handlePressIn = () => {
    setIsPressed(true);
  }

  const handlePressOut = () => {
    setIsPressed(false);
  }

  const containerStyle = [styles.container, isPressed && styles.containerPressed];

  return (
    <View style={tw`my-1`}>
      <TouchableHighlight
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        underlayColor="rgba(0, 0, 0, 0)"
        style={containerStyle}
      >
        <View style={styles.content}>
          <View style={styles.groupInfo}>
            <Text style={[tw`font-bold`]}>{group.name.toUpperCase() || ' Group name'}</Text>
            <Text style={[tw`text-gray-500`]}>{group.description || 'Group description'}</Text>
          </View>
          <TouchableHighlight style={styles.button} onPress={onPress} underlayColor="#125C7F">
            <Text style={[tw`text-white`]}>Edit</Text>
          </TouchableHighlight>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(25, 167, 206, 0.10)',
    borderRadius: 8,
    overflow: 'hidden',
  },

  containerPressed: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  groupInfo: {
    flex: 1,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#146C94',
    borderRadius: 8,
  },
});
