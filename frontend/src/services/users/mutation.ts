import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, deleteUser, updateUser } from "../api";
import { USER_KEY } from "../queryKeys";

export const useUserMutations = () => {
    const queryClient = useQueryClient();
  
    const addUserMutation = useMutation({
      mutationFn: addUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      },
    });
  
    const updateUserMutation = useMutation({
      mutationFn: updateUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      },
    });
  
    const deleteUserMutation = useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      },
    });
  
    return {
      addUserMutation,
      updateUserMutation,
      deleteUserMutation,
    };
  };