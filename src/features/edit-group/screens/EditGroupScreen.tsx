import { View, Text } from "native-base";
import { Group } from "../../../model/Group";
import tw from "twrnc";
import { MESSAGE_CREATING_GROUP, MESSAGE_ERROR, MESSAGE_GROUP_CREATED } from "../../../constants/messages";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import { CreateGroupForm, CreateGroupFormValues } from "../../../components/forms/CreateGroupForm";
import { AuthenticatedLayout } from "../../../components/layout/AuthenticatedLayout";
import React, { useState } from "react";
import { useCreateGroup } from "../../create-group/hooks/use-create-group";
import { EditGroupForm } from "../../../components/forms/EditGroupForm";

export type EditGroupScreenProps = {
  route: {params: {group: Group}};
};


export const EditGroupScreen = ({ route }: EditGroupScreenProps) => {

  const { group } = route.params;
  
  const [isGroupCreated, setGroupCreated] = useState(false);
  const [createdGroupId, setCreatedGroupId] = useState<string>(''); // Cambiar a string en lugar de null
  const [handleCreateGroup, createGroupState] = useCreateGroup();

  const handleSubmit = async (values: CreateGroupFormValues) => {
    try {
      const createdGroup = await handleCreateGroup(values);
      setGroupCreated(true);
      if (createdGroup !== null) {
        setCreatedGroupId(createdGroup.id);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (<>
    <AuthenticatedLayout>
      { createGroupState.error ? (
          <Text style={ tw`text-red-500 my-2` }>{ MESSAGE_ERROR }</Text>
      ) : (
          <>
            { isGroupCreated && (
                <Text style={ tw`text-green-500 my-2` }>{ MESSAGE_GROUP_CREATED }</Text>
            ) }
            { createGroupState.isLoading && (
                <>
                  <ActivityIndicatorComponent isLoading={ createGroupState.isLoading }/>
                  <Text style={ tw`text-yellow-500 my-2` }>{ MESSAGE_CREATING_GROUP }</Text>
                </>
            ) }
          </>
      ) }
      <EditGroupForm
          group={ group }
          onSubmit={ handleSubmit }
          buttonText={ 'Edit group' }
          isLoading={ createGroupState.isLoading }/>

    </AuthenticatedLayout>
  </>);
}