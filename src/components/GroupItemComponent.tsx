import { View, Text } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { GroupItem } from "../model/GroupItem";

export type GroupItemProps = {
  group: GroupItem,
  onPress?: () => void,
  isSelected?: boolean
}

export const GroupItemComponent = ({ group, onPress, isSelected }: GroupItemProps) => {

  const containerStyle = isSelected ? tw`bg-sky-100` : tw`bg-white`;
  const textStyle = isSelected ? tw`text-gray-500` : tw`text-gray-500`;

  console.log('isSelected', isSelected, group.id)

  return (
      <TouchableOpacity
          style={ [tw`rounded`, containerStyle, tw`px-2 py-3`] }
          onPress={ onPress }
          activeOpacity={ 0.7 }
      >
        <Text style={ [tw`font-bold`, textStyle] }>{ group.name.toUpperCase() || ' Group name' }</Text>
        <Text style={ [tw`text-sm`, textStyle] }>Admin: { group.adminName || 'Admin name' }</Text>
      </TouchableOpacity>
  )
}
