import { useUserMutations } from "../services/users/mutation";
import { useUserQuery, useUsersQuery } from "../services/users/queries";


export const useUsers = (userId?: string) => {
  const usersQuery = useUsersQuery();
  const userQuery = useUserQuery(userId);
  const { addUserMutation, updateUserMutation, deleteUserMutation } = useUserMutations();

  return {
    usersQuery,
    userQuery,
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};
