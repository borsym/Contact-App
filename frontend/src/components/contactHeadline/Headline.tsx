import { PlusIcon, SettingsIcon } from "../../assets/icons/Icons";
import Button from "../button/Button";

const Headline: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 w-full h-full">
      <div className="text-3xl">Contacts</div>

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
            onClick={() => {}}
            icon={<PlusIcon />}
            variant="special"
          />
        </div>
      </div>
    </div>
  );
};

export default Headline;
