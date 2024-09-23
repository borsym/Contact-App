import {
  CallIcon,
  DeleteIcon,
  FavouriteIcon,
  MuteIcon,
  SettingsIcon,
} from "../../assets/icons/Icons";
import { useModalContext } from "../../context/ModalContext";
import { useContacts } from "../../hooks/useContacts";
import Contact from "./Contact";

const hoverButtons = [
  { icon: <MuteIcon />, action: () => console.log("Mute") },
  { icon: <CallIcon />, action: () => console.log("Call") },
];

const ContactList: React.FC = () => {
  const { contactsQuery, deleteContactMutation } = useContacts(
    "96deb1b9-d39a-4958-95d3-51f6843fab54"
  );
  const { openModal } = useModalContext();

  const handleDelete = async (contactId: string) => {
    await deleteContactMutation.mutateAsync(contactId);
  };

  const handleEdit = (contact: any) => {
    openModal(contact);
  };

  const menuOptions = (contact: any) => [
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
      action: () => handleDelete(contact.id),
      icon: <DeleteIcon />,
    },
  ];

  if (contactsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (contactsQuery.isError) {
    return <div>Error loading contacts</div>;
  }

  const contacts = contactsQuery.data || [];

  return (
    <div className="space-y-6">
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          {...contact}
          hoverButtons={hoverButtons}
          menuOptions={menuOptions(contact)}
        />
      ))}
    </div>
  );
};

export default ContactList;
