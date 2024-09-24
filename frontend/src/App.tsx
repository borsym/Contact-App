import { BackArrowIcon, LightModeIcon } from "./assets/icons/Icons";
import Headline from "./components/contactHeadline/Headline";
import ContactList from "./components/contacts/ContactList";
import GridItem from "./components/gridItem/GridItem";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <ModalProvider>
      <div>
        <div className="grid grid-cols-[20%_60%_20%] grid-rows-[10vh_10vh_80vh] min-h-full bg-black">
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem></GridItem>
          <GridItem className="flex justify-end items-center">
            <BackArrowIcon />
          </GridItem>
          <div className="border border-[#2D2D2D]">
            <Headline />
          </div>
          <GridItem className="flex justify-start items-center">
            <LightModeIcon />
          </GridItem>

          <GridItem></GridItem>
          <div className="border border-[#2D2D2D] p-4">
            <ContactList />
          </div>
          <GridItem></GridItem>
        </div>
      </div>
    </ModalProvider>
  );
}

export default App;
