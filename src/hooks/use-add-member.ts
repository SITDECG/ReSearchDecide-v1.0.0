import { useState } from "react";
import { addMember } from "../api/groups";

type AddMemberState = {
  isLoading: boolean;
  error: string | null;
};

export const useAddMember = (): [(uid: string, idGroup: string, role: string) => Promise<void>, AddMemberState] => {
  const [state, setState] = useState<AddMemberState>({
    isLoading: false,
    error: null,
  });

  const handleAddMember = async (uid: string, idGroup: string, role: string): Promise<void> => {
    setState({ isLoading: true, error: null });

    try {
      const addedMember = await addMember(uid, idGroup, role);
      if (addedMember !== null) {
        console.log("Member added", addedMember);
      }
      setState({ isLoading: false, error: null });
      console.log("Member added");
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message });
    }
  };

  return [handleAddMember, { ...state }];
};
