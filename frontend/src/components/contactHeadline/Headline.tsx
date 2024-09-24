import { PlusIcon, SettingsIcon } from "../../assets/icons/Icons";
import { useModalContext } from "../../context/ModalContext";
import { useUsers } from "../../hooks/useUsers";
import { MockIdProps } from "../../types/types";
import React from "react";
import Button from "../common/button/Button";
import ContactForm from "../modal/ContactForm";
import Modal from "../modal/Modal";

const Headline: React.FC<MockIdProps> = ({ userId }) => {
  const { openModal, closeModal } = useModalContext();

  const handleAddContact = () => {
    openModal(null);
  };
  const { userQuery } = useUsers(userId);

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (userQuery.isError) {
    return <div>Error loading user</div>;
  }

  const user = userQuery.data || [];

  return (
    <div className="flex justify-between items-center p-4 w-full h-full">
      <h1 className="font-glysa text-white font-medium">Contacts</h1>

      <div className="flex items-center space-x-4">
        <button>
          <SettingsIcon />
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src={user.imageName}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <Button
            label="Add new"
            onClick={handleAddContact}
            icon={<PlusIcon />}
            variant="special"
          />
        </div>
        <Modal onClose={closeModal} title="Add New Contact">
          <ContactForm userId={userId} />
        </Modal>
      </div>
    </div>
  );
};

export default Headline;
