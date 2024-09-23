import React, { createContext, useContext, useState } from "react";
import { ContactContextProps, ContactProps } from "../types/types";

const ModalContext = createContext<ContactContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState<ContactProps | null>(
    null
  );

  const openModal = (contact: ContactProps | null = null) => {
    setCurrentContact(contact);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCurrentContact(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        currentContact,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
};
