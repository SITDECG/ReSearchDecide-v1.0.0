import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'; // Import TouchableOpacity
import { useMembersList } from "../hooks/use-members-list";
import { Member } from "../model/Member";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import icons from "../../assets/incons";
import tw from "twrnc";

type MembersListComponentProps = {
  groupId: string;
};

const MembersListComponent = ({ groupId }: MembersListComponentProps) => {

  const [members, refreshMembers] = useMembersList(groupId);

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
                  <View style={ { paddingVertical: 4 } }>
                    <Text>{ item.userName }</Text>
                  </View>
              ) }
              keyExtractor={ (item) => item.userId }
          />
        </View>
      </View>
  );

};

export default MembersListComponent;
