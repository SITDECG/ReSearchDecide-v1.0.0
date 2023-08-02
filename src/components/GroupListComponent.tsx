import { SafeAreaView } from "react-native";
import { FlatList, View } from "native-base";
import { Group } from "../model/Group";
import { GroupItemComponent } from "./GroupItemComponent";
import React from "react";

type GroupListProps = {
  groups: Group[]
}

export const GroupListComponent = ({ groups }: GroupListProps) => {
  const [selectedItem, setSelectedItem] = React.useState<Group | null>(null)

  return (<>
    <SafeAreaView>
      <View>
        <FlatList
            data={ groups }
            renderItem={ ({ item }) =>
                <GroupItemComponent
                    group={ item }
                    onPress={ () => setSelectedItem(item) }
                    isSelected={ selectedItem?.id === item.id }
                /> }
            keyExtractor={ ({ id }) => id }
        />
      </View>
    </SafeAreaView>
  </>);
}
