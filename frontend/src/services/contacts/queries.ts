import { useQuery } from "@tanstack/react-query";
import { fetchContactsByUserId } from "../api";
import { CONTACT_KEY } from "../queryKeys";

export const useContactsQuery = (userId?: string) => {
    return useQuery({
      queryKey: [CONTACT_KEY, userId],
      queryFn: () => fetchContactsByUserId(userId!),
      enabled: !!userId,
    });
  };
  