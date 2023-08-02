import { CreateGroupFormValues } from "../../../components/forms/CreateGroupForm";
import { useState } from "react";
import { saveGroup } from "../../../api/groups";
import { Group } from "../../../model/Group";

type CreateGroupState = {
  isLoading: boolean;
  error: string | null;
};

export const useCreateGroup = (): [(values: CreateGroupFormValues) => Promise<Group | null>, CreateGroupState] => {
  const [state, setState] = useState<CreateGroupState>({
    isLoading: false,
    error: null,
  });

  const handleCreateGroup = async (values: CreateGroupFormValues): Promise<Group | null> => {
    setState({ isLoading: true, error: null });

    try {
      const createdGroup = await saveGroup(values.group);
      setState({ isLoading: false, error: null });
      return createdGroup;
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message });
      return null;
    }
  };

  return [handleCreateGroup, { ...state }];
};
