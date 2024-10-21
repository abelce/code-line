import Embed from "./Embed";
import Exports from "./Exports";

const Header = () => {
  return (
    <header className="bg-[#272525] flex justify-between p-4 border border-l-0 border-r-0 border-t-0">
      <div></div>
      <div className="flex gap-4">
        <Embed />
        <Exports />
      </div>
    </header>
  );
};

export default Header;
