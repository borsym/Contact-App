import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../utilts";
import { UserProps } from "../types/types";
import defaultAvatar from "../assets/images/default.png";
const fetchContactsByUserId = async (userId: string) => {
  const { data } = await instance.get(`/contacts/users/${userId}`);
  return data;
};
const createContact = async ({
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

const updateContact = async ({
  contactId,
  contact,
}: {
  contactId: string;
  contact: UserProps;
}) => {
  const formData = new FormData();
  const { imageName, ...contactWithoutImage } = contact;

  const imageToUpload = imageName instanceof File ? imageName : null; // Only upload if the image is a new file

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
const deleteContact = async (contactId: string) => {
  await instance.delete(`/contacts/${contactId}`);
};

export const useContacts = (contactId?: string) => {
  const queryClient = useQueryClient();

  const contactsQuery = useQuery({
    queryKey: ["contacts", contactId],
    queryFn: () => fetchContactsByUserId(contactId!),
    enabled: !!contactId,
  });

  const createContactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const deleteContactMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return {
    contactsQuery,
    createContactMutation,
    updateContactMutation,
    deleteContactMutation,
  };
};
