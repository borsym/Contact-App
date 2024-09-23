import { useModalContext } from "../../context/ModalContext";
import { ModalProps } from "../../types/types";

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
  const { isModalVisible } = useModalContext();
  if (!isModalVisible) return null;

  return (
    <div
      className="fixed inset-0  flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className=" rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
