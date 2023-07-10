import React from 'react';
import { FlatList, View, Text } from 'native-base';
import { User } from "../model/User";
import RNPickerSelect from 'react-native-picker-select';


type UserListComponentProps = {
  users: User[]
}

const UserListComponent = ({ users }: UserListComponentProps) => {
  const [selectedValue, setSelectedValue] = React.useState<any>(null);

  const handleValueChange = (value: any) => {
    setSelectedValue(value);
  };
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
      <FlatList
          data={users}
          renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>


              </View>
          )}
          keyExtractor={({ id }) => id.toString()}
      />
  );
};

export default UserListComponent;
