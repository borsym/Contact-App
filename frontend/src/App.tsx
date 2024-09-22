import Headline from "./components/contactHeadline/Headline";
import ContactList from "./components/contacts/ContactList";
import GridItem from "./components/gridItem/GridItem";

function App() {
  return (
    <div>
      <div className="grid grid-cols-[20%_60%_20%] grid-rows-[10vh_10vh_80vh] min-h-full bg-black">
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>

        <GridItem>1</GridItem>
        <div className="border border-[#2D2D2D]">
          <Headline />
        </div>
        <GridItem>3</GridItem>

        <GridItem>1</GridItem>
        <div className="border border-[#2D2D2D] p-4">
          <ContactList />
        </div>
        <GridItem>3</GridItem>
      </div>
    </div>
  );
}

export default App;
