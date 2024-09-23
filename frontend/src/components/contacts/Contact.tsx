import { useState } from "react";
import { ContactProps } from "../../types/types";
import { MoreIcon } from "../../assets/icons/Icons";
import Button from "../common/button/Button";
import React from "react";
import { useModalContext } from "../../context/ModalContext";

const Contact: React.FC<ContactProps> = ({
  id,
  name,
  phoneNumber,
  imgUrl,
  email,
  hoverButtons = [],
  menuOptions = [],
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { openModal } = useModalContext();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEdit = () => {
    openModal({ id, name, phoneNumber, imgUrl, email });
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="flex items-center justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDropdownOpen(false);
      }}
    >
      <div className="flex items-center space-x-1">
        <img
          src={imgUrl}
          alt={`${name}'s avatar`}
          className="w-10 h-10 rounded-full mr-4 border"
        />
        <div>
          <h3 className="text-white">{name}</h3>
          <p className="text-[#FFFFFF8F]"> {phoneNumber}</p>
        </div>
      </div>

      {isHovered && (
        <div className="flex space-x-2 relative">
          {hoverButtons.map((button, index) => (
            <Button
              key={index}
              onClick={button.action}
              icon={button.icon}
              variant="secondary"
            />
          ))}
          <div className="realtive">
            <Button
              onClick={toggleDropdown}
              icon={<MoreIcon />}
              variant="secondary"
            />
            {isDropdownOpen && (
              <div className="absolute w-max bg-[#141414] text-white shadow-lg border rounded z-10">
                <ul className="flex flex-col">
                  {menuOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={
                        option.label === "Edit" ? handleEdit : option.action
                      }
                      className="px-4 py-2 hover:bg-[#282828] cursor-pointer flex items-center"
                    >
                      {option.icon}
                      <span className="ml-2">{option.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
