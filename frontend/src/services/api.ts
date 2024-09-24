import { instance } from "../utilts";
import { UserProps } from "../types/types";
import defaultAvatar from "../assets/images/default.png";

export const fetchUsers = async () => {
  const { data } = await instance.get(`/users`);
  return data;
};

export const fetchUserById = async (userId: string) => {
  const { data } = await instance.get(`/users/${userId}`);
  return data;
};

export const addUser = async (newUser: UserProps) => {
  const formData = new FormData();
  const { imageName, ...userWithoutImage } = newUser;
  formData.append("file", imageName!);
  formData.append(
    "user",
    new Blob([JSON.stringify(userWithoutImage)], { type: "application/json" })
  );

  await instance.post(`/users`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateUser = async (updatedUser: UserProps) => {
  const formData = new FormData();
  const { imageName, ...userWithoutImage } = updatedUser;
  formData.append("file", imageName!);
  formData.append(
    "user",
    new Blob([JSON.stringify(userWithoutImage)], { type: "application/json" })
  );
  await instance.put(`/users/${updatedUser.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteUser = async (userId: string) => {
  await instance.delete(`/users/${userId}`);
};

export const fetchContactsByUserId = async (userId: string) => {
  const { data } = await instance.get(`/contacts/users/${userId}`);
  return data;
};

export const createContact = async ({
  userId,
  contact,
}: {
  userId: string;
  contact: UserProps;
}) => {
  const formData = new FormData();
  const { imageName, ...contactWithoutImage } = contact;

  const imageToUpload =
    imageName instanceof File
      ? imageName
      : await fetch(defaultAvatar).then((res) => res.blob());

  formData.append("file", imageToUpload);
  formData.append(
    "contact",
    new Blob([JSON.stringify(contactWithoutImage)], {
      type: "application/json",
    })
  );

  await instance.post(`/contacts/users/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateContact = async ({
  contactId,
  contact,
}: {
  contactId: string;
  contact: UserProps;
}) => {
  const formData = new FormData();
  const { imageName, ...contactWithoutImage } = contact;

  const imageToUpload =
    imageName instanceof File
      ? imageName
      : await fetch(defaultAvatar).then((res) => res.blob());

  if (imageToUpload) {
    formData.append("file", imageToUpload);
  }

  formData.append(
    "contact",
    new Blob([JSON.stringify(contactWithoutImage)], {
      type: "application/json",
    })
  );

  await instance.put(`/contacts/${contactId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteContact = async (contactId: string) => {
  console.log(contactId);
  await instance.delete(`/contacts/${contactId}`);
};
