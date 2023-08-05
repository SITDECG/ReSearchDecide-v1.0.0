import { View, Text } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { Group } from "../model/Group";

export type GroupItemProps = {
  group: Group,
  onPress?: () => void,
  isSelected?: boolean
}

export const GroupItemComponent = ({ group, onPress, isSelected }: GroupItemProps) => {


  return (
      <View style={ tw`flex flex-row justify-between items-center px-2 hover:bg-sky-700 my-1` }>
        <View>
          <Text style={ [tw`font-bold`] }>{ group.name.toUpperCase() || ' Group name' }</Text>
          <Text style={ [tw`text-gray-500`] }>{ group.description || 'Group description' }</Text>
        </View>
        <View>
          <TouchableOpacity style={ [tw`rounded`, styles.button] }
                            onPress={ onPress }
          >
            <Text style={ [tw`text-white`] }>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#146C94',
    width: 80,
  },
});
