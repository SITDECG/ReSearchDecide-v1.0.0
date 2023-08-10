import { useCallback } from "react";
import { deleteGroupById } from "../../../api/groups";

type UseDeleteGroupHook = () => {
  deleteGroup: (groupId: string) => Promise<void>;
};

export const useDeleteGroup: UseDeleteGroupHook = () => {
  const deleteGroup = useCallback(async (groupId: string) => {
    try {
      await deleteGroupById(groupId);
    } catch (error) {
      // Aquí puedes manejar errores si es necesario
      console.error("Error deleting group:", error);
      throw error; // Puedes relanzar el error si lo deseas
    }
  }, []);

  return { deleteGroup };
};
