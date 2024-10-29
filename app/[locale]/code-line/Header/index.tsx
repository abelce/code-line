import Embed from "./Embed";
import Exports from "./Exports";
import LocalSwitcher from "./LocalSwitcher";
import CopyLink from "./CodeLink";
import Fallback from "./Fallback";

const Header = () => {
  return (
    <header className="bg-[rgb(19 19 19)] flex justify-between px-4 py-2 border border-l-0 border-r-0 border-t-0">
      <div className="flex items-center">
        <div className="text-white flex flex-row items-center gap-2 font-bold">
          <img src={'/images/logo.png'} alt="CodePic.cc" className="w-[40px] rounded"/>
          CodePic
        </div>
      </div>
      <div className="flex gap-4">
        <Fallback />
        <CopyLink />
        <Embed />
        <Exports />
        <LocalSwitcher />
      </div>
    </header>
  );
};

export default Header;
