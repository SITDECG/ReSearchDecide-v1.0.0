import { View} from "native-base";
import React from 'react'
import tw from 'twrnc'
import { TextInput } from "react-native";
import { GroupListComponent } from "../../../components/GroupListComponent";
import { GroupItem } from "../../../model/GroupItem";


const DATA: GroupItem[] = [
  {
    id: 1,
    name: 'Group Todo lo que quiero',
    adminName: 'Timoteo Camuendo',
    description: 'This is a group'
  },
  {
    id: 2,
    name: 'Group Todo lo no que quiero',
    adminName: 'Alberto Camuendo',
    description: 'This is a group'
  },
  {
    id: 3,
    name: 'Group Todo lo que quiero y no quiero',
    adminName: 'Roxana Castro',
    description: 'This is a group'
  }
]

export const GroupListScreen = () => {

  return (
      <View>
        <TextInput style={ tw`border` }></TextInput>
        <GroupListComponent groups={ DATA }/>
      </View>
  )
}
