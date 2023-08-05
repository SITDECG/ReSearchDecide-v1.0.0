import { deleteMemberById } from "../../../api/groups";
import { useState } from "react";

type DeleteMemberState = {
  isLoading: boolean;
  error: string | null;
  isDeleted: boolean | null;
};

export const useDeleteMember = (): [handleDeleteMember: (memberId: string) => Promise<void>, state: DeleteMemberState] => {
  const [state, setState] = useState<DeleteMemberState>({
    isLoading: false,
    error: null,
    isDeleted: null,
  });

  const handleDeleteMember = async (memberId: string): Promise<void> => {
    setState({ isLoading: true, error: null, isDeleted: null });

    try {
      await deleteMemberById(memberId);
      setState({ isLoading: false, error: null, isDeleted: true });
      console.log("Member deleted");
    } catch (error: Error | any) {
      setState({ isLoading: false, error: error?.message, isDeleted: false });
    }
  };

  return [handleDeleteMember, { ...state }];
};
