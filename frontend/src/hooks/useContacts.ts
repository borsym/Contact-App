import { useContactMutations } from "../services/contacts/mutation";
import { useContactsQuery } from "../services/contacts/queries";

export const useContacts = (userId?: string) => {
  const contactsQuery = useContactsQuery(userId);
  const { createContactMutation, updateContactMutation, deleteContactMutation } = useContactMutations();

  return {
    contactsQuery,
    createContactMutation,
    updateContactMutation,
    deleteContactMutation,
  };
};
