import { EditGroupFormValues } from "../../../components/forms/EditGroupForm";
import { useState } from "react";
import { updateGroup } from "../../../api/groups";
import { Group } from "../../../model/Group";

type EditGroupState = {
  isLoading: boolean;
  error: string | null;
};

export const useEditGroup = (): [(values: EditGroupFormValues) => Promise<Group | null>, EditGroupState] => {
  const [state, setState] = useState<EditGroupState>({
    isLoading: false,
    error: null,
  });

  const handleEditGroup = async (values: EditGroupFormValues): Promise<Group | null> => {
    setState({ isLoading: true, error: null });

    try {
      const editedGroup = await updateGroup(values.group);
      setState({ isLoading: false, error: null });
      return editedGroup;
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message });
      return null;
    }
  };

  return [handleEditGroup, { ...state }];
};