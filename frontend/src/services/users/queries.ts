import { useQuery } from "@tanstack/react-query";
import { fetchUserById, fetchUsers } from "../api";
import { USER_KEY } from "../queryKeys";

export const useUsersQuery = () => {
  return useQuery({ queryKey: [USER_KEY], queryFn: fetchUsers });
};

export const useUserQuery = (userId?: string) => {
  return useQuery({
    queryKey: [USER_KEY, userId],
    queryFn: () => fetchUserById(userId!),
    enabled: !!userId,
  });
};
