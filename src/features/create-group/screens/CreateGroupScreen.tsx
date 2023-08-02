import React, { useState } from 'react';
import { AuthenticatedLayout } from "../../../components/layout/AuthenticatedLayout";
import { CreateGroupForm, CreateGroupFormValues } from "../../../components/forms/CreateGroupForm";
import { useCreateGroup } from "../hooks/use-create-group";
import { Text } from "native-base";
import tw from "twrnc";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import { MESSAGE_CREATING_GROUP, MESSAGE_GROUP_CREATED, MESSAGE_ERROR } from "../../../constants/messages";


export const CreateGroupScreen = () => {
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

  return (
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
        <CreateGroupForm
            onSubmit={ handleSubmit }
            buttonText={ 'Create group' }
            isLoading={ createGroupState.isLoading }
            groupId={ createdGroupId }
        />
      </AuthenticatedLayout>
  );

};
