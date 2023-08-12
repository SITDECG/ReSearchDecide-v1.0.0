import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native'; // Import TouchableOpacity
import { useMembersList } from "../hooks/use-members-list";
import { Member } from "../model/Member";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../assets/incons";
import tw from "twrnc";
import { Group } from "../model/Group";
import { useDeleteMember } from "../features/edit-group/hooks/use-delete-member";
import { ActivityIndicatorComponent } from "./util/ActivityIndicatorComponent";
import ErrorMessage from "./util/ErrorMessage";

type MembersListComponentProps = {
  group: Group;
};

const MembersListComponent = ({ group }: MembersListComponentProps) => {

  const [members, refreshMembers] = useMembersList(group?.id);
  console.log('groupId', group?.id)
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value: string) => {
    setSearchValue(value);
  }

  let filteredMembers = members;

  if (searchValue !== '') {
    filteredMembers = members?.filter((member) =>
        member.userName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }


  useEffect(() => {
    return () => {
      refreshMembers();
    };
  }, []);

  const [handleDeleteMember, { isLoading, error, isDeleted }] = useDeleteMember();

  const handleDeleteClick = async (member: Member) => {
    try {
      console.log('member', member);
      console.log('member.id', member?.id);
      await handleDeleteMember(String(member?.id));
    } catch (error) {
      console.log("Error deleting member:", error);
    }
  };


  return (
      <View>

        <View style={ tw`flex flex-row items-center bg-gray-100  p-2 rounded gap-2 mb-3` }>
          <FontAwesomeIcon icon={ icons.search }/>
          <TextInput
              placeholder="Search..."
              style={ tw`flex-1` }
              onChangeText={ handleSearch }
              value={ searchValue }
          />
        </View>

        { isLoading && <ActivityIndicatorComponent isLoading={ isLoading }/> }
        { error && <ErrorMessage error={ error }/> }

        <View style={ { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 } }>
          <TouchableOpacity onPress={ refreshMembers } style={ { padding: 8 } }>
            <View style={ tw`flex flex-row items-center gap-2` }>
              <FontAwesomeIcon icon={ icons.refresh } size={ 20 }/>
              <Text>Refresh</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={ { fontSize: 16, fontWeight: 'bold', marginBottom: 8 } }>Members List</Text>
          <FlatList
              data={ filteredMembers }
              renderItem={ ({ item }) => (
                  <View style={ [{ paddingVertical: 4 }, tw`flex flex-row justify-between`] }>
                    <Text>{ item.userName }</Text>
                    <TouchableOpacity
                        onPress={ () => handleDeleteClick(item) }
                        style={ [{ padding: 8 }, styles.button, tw`rounded`] }
                    >
                      <View style={ tw`flex flex-row items-center gap-2` }>
                        <FontAwesomeIcon icon={ icons.trash } size={ 15 } color={ '#fff' }/>
                        <Text style={ tw`text-white` }>Delete</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
              ) }
              keyExtractor={ (item) => item.userId }
          />
        </View>
      </View>
  );

};

export default MembersListComponent;


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#146C94',
    width: 80,
  },
});