import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, instance } from "../utilts";
import { UserProps } from "../types/types";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await instance.get(`/users`);
  return data;
};

const fetchUserById = async (userId: string) => {
  const { data } = await instance.get(`/users/${userId}`);
  return data;
};

const addUser = async (newUser: UserProps) => {
  const formData = new FormData();
  const { imageName, ...usertWithoutImage } = newUser;
  formData.append("file", imageName!);
  formData.append(
    "user",
    new Blob([JSON.stringify(usertWithoutImage)], { type: "application/json" })
  );

  await instance.post(`/users`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateUser = async (updatedUser: UserProps) => {
  const formData = new FormData();
  const { imageName, ...usertWithoutImage } = updatedUser;
  formData.append("file", imageName!);
  formData.append(
    "user",
    new Blob([JSON.stringify(usertWithoutImage)], { type: "application/json" })
  );
  await instance.put(`}/users/${updatedUser.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = async (userId: string) => {
  await instance.delete(`/users/${userId}`);
};

export const useUsers = (userId?: string) => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const userQuery = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUserById(userId!),
    enabled: !!userId,
  });

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    userQuery,
    usersQuery,
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};
