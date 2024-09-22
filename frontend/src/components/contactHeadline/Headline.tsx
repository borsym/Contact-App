import { PlusIcon, SettingsIcon } from "../../assets/icons/Icons";
import { useModalContext } from "../../context/ModalContext";
import Button from "../button/Button";
import ContactForm from "../modal/ContactForm";
import Modal from "../modal/Modal";

const Headline: React.FC = () => {
  const { openModal, closeModal } = useModalContext();

  const handleAddContact = () => {
    openModal(null); // Open the modal without a contact (for adding)
  };

  return (
    <div className="flex justify-between items-center p-4 w-full h-full">
      <div className="text-3xl text-white">Contacts</div>

      <div className="flex items-center space-x-4">
        <button className="">
          <SettingsIcon />
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://picsum.photos/seed/picsum/200/300"
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
          <ContactForm />
        </Modal>
      </div>
    </div>
  );
};

export default Headline;
