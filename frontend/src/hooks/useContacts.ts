import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utilts";

const fetchContactsByUserId = async (userId: string) => {
  const { data } = await axios.get(`${BASE_URL}/contacts/users/${userId}`);
  return data;
};

const createContact = async ({ userId, contact }: any) => {
  const formData = new FormData();
  console.log(contact.imageName);
  formData.append("file", contact.imageName);
  formData.append(
    "contact",
    new Blob(
      [
        JSON.stringify({
          name: contact.name,
          email: contact.email,
          phoneNumber: contact.phoneNumber,
        }),
      ],
      { type: "application/json" }
    )
  );

  await axios.post(`${BASE_URL}/contacts/users/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateContact = async ({ contactId, contact }: any) => {
  console.log("con", contactId);
  console.log("contact", contact);
  const formData = new FormData();
  formData.append("file", contact.imageName);
  formData.append(
    "contact",
    new Blob(
      [
        JSON.stringify({
          name: contact.name,
          email: contact.email,
          phoneNumber: contact.phoneNumber,
        }),
      ],
      { type: "application/json" }
    )
  );

  await axios.put(`${BASE_URL}/contacts/${contactId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteContact = async (contactId: string) => {
  await axios.delete(`${BASE_URL}/contacts/${contactId}`);
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
