import { SafeAreaView } from "react-native";
import { FlatList, View } from "native-base";
import { Group } from "../model/Group";
import { GroupItemComponent } from "./GroupItemComponent";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { EditGroupScreen } from "../features/edit-group/screens/EditGroupScreen";

type GroupListProps = {
  groups: Group[]
}

export const GroupListComponent = ({ groups }: GroupListProps) => {
  const [selectedItem, setSelectedItem] = React.useState<Group | null>(null)

  console.log('selectedItem', selectedItem);

  const navigation = useNavigation();

  const handlePress = (group: Group) => {
    setSelectedItem(group);
    navigation.navigate('EditGroupScreen' as keyof typeof EditGroupScreen, { group } as never);
  }


  return (<>
    <SafeAreaView>
      <View>
        <FlatList
            data={ groups }
            renderItem={ ({ item }) =>
                <GroupItemComponent
                    group={ item }
                    onPress={ () => handlePress(item) }
                    isSelected={ selectedItem?.id === item.id }
                />
            }
            keyExtractor={ ({ id }) => id }
        />
      </View>
    </SafeAreaView>
  </>);
}
