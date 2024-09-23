import {
  CallIcon,
  DeleteIcon,
  FavouriteIcon,
  MuteIcon,
  SettingsIcon,
} from "../../assets/icons/Icons";
import { useModalContext } from "../../context/ModalContext";
import { useContacts } from "../../hooks/useContacts";
import { UserProps } from "../../types/types";
import Contact from "./Contact";
import React from "react";

const hoverButtons = [
  { icon: <MuteIcon />, action: () => console.log("Mute") },
  { icon: <CallIcon />, action: () => console.log("Call") },
];

const ContactList: React.FC = () => {
  const { contactsQuery, deleteContactMutation } = useContacts(
    "dd3d8e4b-dafd-4b0d-97f9-69d3da1721f3"
  );
  const { openModal } = useModalContext();

  const handleDelete = async (contactId: string) => {
    await deleteContactMutation.mutateAsync(contactId);
  };

  const handleEdit = (contact: UserProps) => {
    openModal(contact);
  };

  const menuOptions = (contact: UserProps) => [
    {
      label: "Edit",
      action: () => handleEdit(contact),
      icon: <SettingsIcon />,
    },
    {
      label: "Favourite",
      action: () => console.log("Favourite"),
      icon: <FavouriteIcon />,
    },
    {
      label: "Delete",
      action: () => handleDelete(contact.id!),
      icon: <DeleteIcon />,
    },
  ];

  if (contactsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (contactsQuery.isError) {
    return <div>Error loading contacts</div>;
  }

  const contacts: UserProps[] = contactsQuery.data || [];
  return (
    <div className="space-y-6">
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          user={contact}
          hoverButtons={hoverButtons}
          menuOptions={menuOptions(contact)}
        />
      ))}
    </div>
  );
};

export default ContactList;
