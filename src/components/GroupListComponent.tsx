import { SafeAreaView } from "react-native";
import { FlatList, View } from "native-base";
import { Group } from "../model/Group";
import { GroupItemComponent } from "./GroupItemComponent";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, MyParam } from "../navigation/types";

type GroupListProps = {
  groups: Group[]
}

export const GroupListComponent = ({ groups }: GroupListProps) => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<Group | null>(null)
  const handlePress = () => {
    // const param: MyParam = {
    //   id: selectedItem?.id,
    //   name: selectedItem?.name
    // };
    // navigation.navigate(('GroupScreen' as never, {param }) as never);
    navigation.navigate('GroupScreen' as never);
  };
  const isSelected = (group: Group) => {
    setSelectedItem(group);
  };
  return (<>
    <SafeAreaView>
      <View>
        <FlatList
            data={ groups }
            renderItem={ ({ item }) =>
                <GroupItemComponent
                    group={ item }
                    onPress={handlePress}
                    isSelected={ selectedItem?.id === item.id }
                /> }
            keyExtractor={ ({ id }) => id }
        />
      </View>
    </SafeAreaView>
  </>);
}