import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utilts";

const fetchUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data;
};

const addUser = async (newUser: any) => {
  const formData = new FormData();
  formData.append("file", newUser.imgUrl);
  formData.append(
    "user",
    new Blob(
      [
        JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
        }),
      ],
      { type: "application/json" }
    )
  );

  await axios.post(`${BASE_URL}/users`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateUser = async (updatedUser: any) => {
  const formData = new FormData();
  formData.append("file", updatedUser.imgUrl);
  formData.append(
    "user",
    JSON.stringify({
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
    })
  );
  await axios.put(`${BASE_URL}/users/${updatedUser.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = async (userId: string) => {
  await axios.delete(`${BASE_URL}/users/${userId}`);
};

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

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
    usersQuery,
    addUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};
