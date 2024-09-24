import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact, deleteContact, updateContact } from "../api";
import { CONTACT_KEY } from "../queryKeys";

export const useContactMutations = () => {
    const queryClient = useQueryClient();
  
    const createContactMutation = useMutation({
      mutationFn: createContact,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CONTACT_KEY] });
      },
      onError: (error: any) => {
        if (error.response && error.response.status === 409) {
          throw new Error("Email or phone number already exists");
        }
        throw error;
      },
    });
  
    const updateContactMutation = useMutation({
      mutationFn: updateContact,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CONTACT_KEY] });
      },
    });
  
    const deleteContactMutation = useMutation({
      mutationFn: deleteContact,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CONTACT_KEY] });
      },
    });
  
    return {
      createContactMutation,
      updateContactMutation,
      deleteContactMutation,
    };
  };  
