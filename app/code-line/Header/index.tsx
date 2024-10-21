import Embed from "./Embed";
import Exports from "./Exports";

const Header = () => {
  return (
    <header className="bg-[rgb(19 19 19)] flex justify-between px-4 py-2 border border-l-0 border-r-0 border-t-0">
      <div></div>
      <div className="flex gap-4">
        <Embed />
        <Exports />
      </div>
    </header>
  );
};

export default Header;
