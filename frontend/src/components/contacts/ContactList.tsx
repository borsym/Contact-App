import {
  CallIcon,
  DeleteIcon,
  FavouriteIcon,
  MuteIcon,
  SettingsIcon,
} from "../../assets/icons/Icons";
import { useUsers } from "../../hooks/useUsers";
import Contact from "./Contact";

const hoverButtons = [
  { icon: <MuteIcon />, action: () => console.log("Mute") },
  { icon: <CallIcon />, action: () => console.log("Call") },
];

const menuOptions = [
  {
    label: "Edit",
    action: () => console.log("Edit"),
    icon: <SettingsIcon />,
  },
  {
    label: "Favourite",
    action: () => console.log("Favourite"),
    icon: <FavouriteIcon />,
  },
  {
    label: "Delete",
    action: () => console.log("Delete"),
    icon: <DeleteIcon />,
  },
];

const ContactList: React.FC = () => {
 const {} = useUsers;

  return (
    <div className="space-y-6">
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          {...contact}
          hoverButtons={hoverButtons}
          menuOptions={menuOptions}
        />
      ))}
    </div>
  );
};

export default ContactList;
