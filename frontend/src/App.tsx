import { useEffect, useState } from "react";
import { BackArrowIcon, LightModeIcon } from "./assets/icons/Icons";
import Headline from "./components/contactHeadline/Headline";
import ContactList from "./components/contacts/ContactList";
import GridItem from "./components/gridItem/GridItem";
import { ModalProvider } from "./context/ModalContext";
import { instance } from "./utilts";

function App() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await instance.get("/users");
        if (response.data && response.data.length > 0) {
          const fetchedUserId = response.data[0].id;
          setUserId(fetchedUserId);
        } else {
          console.error("No users found");
        }
      } catch (error) {
        console.error("Error fetching USER_ID:", error);
      }
    };

    if (!userId) {
      fetchUserId();
    }
  }, [userId]);

  if (!userId) {
    return <div>Loading USER_ID...</div>;
  }

  return (
    <ModalProvider>
      <div>
        <div className="grid grid-cols-[20%_60%_20%] grid-rows-[10vh_10vh_80vh] min-h-full bg-black">
          <GridItem></GridItem>
          <GridItem>Contacts</GridItem>
          <GridItem></GridItem>
          <div className="border border-[#2D2D2D] p-4 flex justify-end items-center">
            <BackArrowIcon />
          </div>
          <div className="border border-[#2D2D2D]">
            <Headline userId={userId} />
          </div>
          <div className="border border-[#2D2D2D] p-4 flex justify-start items-center">
            <LightModeIcon />
          </div>
          <GridItem></GridItem>
          <div className="border border-[#2D2D2D] p-4">
            <ContactList userId={userId} />
          </div>
          <GridItem></GridItem>
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;
