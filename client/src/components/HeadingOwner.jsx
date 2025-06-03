import { Bell, ChevronDown, LogOut, UserRound } from "lucide-react";
import { useState } from "react";

const HeadingOwner = () => {
  const [, setIsHovered] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleLogout = () => {};

  return (
    <header className="bg-white shadow px-10">
      <div className=" flex justify-end items-center border-b border-b-[#E9EAEC] h-[100px] w-full">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex gap-6 items-center ">
            <Bell />
            <div
              className=" items-center gap-5  p-1 rounded-md hover:bg-secondary z-10 hover:cursor-pointer "
              onClick={() => setIsDown(!isDown)}
            >
              <UserRound  className="border border-slate-300 p-1 rounded-full size-8"/>
              {isDown && (
                <div className="absolute top-10 right-5 bg-white shadow-lg rounded-md w-fit border-2 border-primary-100">
                  <button
                    className="flex items-center p-3 w-full gap-4 h-10 text-[#424242] hover:bg-slate-100 cursor-pointer rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                    <LogOut size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeadingOwner;
