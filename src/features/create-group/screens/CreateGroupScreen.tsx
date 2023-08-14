import React, { useState } from 'react';
import { AuthenticatedLayout } from "../../../components/layout/AuthenticatedLayout";
import { CreateGroupForm, CreateGroupFormValues } from "../../../components/forms/CreateGroupForm";
import { useCreateGroup } from "../hooks/use-create-group";
import { Text } from "native-base";
import tw from "twrnc";
import { ActivityIndicatorComponent } from "../../../components/util/ActivityIndicatorComponent";
import { MESSAGE_CREATING_GROUP, MESSAGE_GROUP_CREATED, MESSAGE_ERROR } from "../../../constants/messages";
import { Group } from "../../../model/Group";
import { useGroupsContext } from "../../../context/GroupContext";

export const CreateGroupScreen = () => {
  const [isGroupCreated, setGroupCreated] = useState(false);
  const [createdGroup, setCreatedGroup] = useState<Group | undefined>(); // Cambiar a string en lugar de null
  const [handleCreateGroup, createGroupState] = useCreateGroup();
  const { setGroups } = useGroupsContext();
  const handleSubmit = async (values: CreateGroupFormValues) => {
    try {
      const createdGroup = await handleCreateGroup(values);
      setGroupCreated(true);
      if (createdGroup !== null) {
        setCreatedGroup(createdGroup);
        setGroups((groups) => [...groups, createdGroup]);
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
            group={ createdGroup }
        />
      </AuthenticatedLayout>
  );

};
