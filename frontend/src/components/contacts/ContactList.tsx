import {
  CallIcon,
  DeleteIcon,
  FavouriteIcon,
  MuteIcon,
  SettingsIcon,
} from "../../assets/icons/Icons";
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
  const contacts = [
    {
      id: "1",
      name: "John Doe",
      phoneNumber: "+1 234 567 890",
      imgUrl: "https://picsum.photos/seed/john/200/200",
    },
    {
      id: "2",
      name: "Jane Smith",
      phoneNumber: "+1 987 654 321",
      imgUrl: "https://picsum.photos/seed/jane/200/200",
    },
    {
      id: "3",
      name: "Bob Johnson",
      phoneNumber: "+1 555 123 4567",
      imgUrl: "https://picsum.photos/seed/bob/200/200",
    },
  ];

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
