import { NavLink, useLocation } from "react-router-dom";

const NavbarOwner = () => {
  return (
    <div className="w-[20vw]  bg-white border-r border-gray-200">
      <div className="w-full flex flex-col">
        <ItemNavbar label="Manage Employee" path="/manage-employee" />
        <ItemNavbar label="Manage Task" path="/manage-task" />
        <ItemNavbar label="Message" path="/message" />
      </div>
    </div>
  );
};

export default NavbarOwner;

const ItemNavbar = ({ label, path }) => {
  const location = useLocation();

  return (
    <NavLink
      to={path}
      className={`w-full pl-[5vw] text-[#2C7BE5] py-4 ${
        location.pathname === path ? "bg-[#E7F1FF] border-r-2 border-r-[#2C7BE5]" : ""
      }`}
    >
      {label}
    </NavLink>
  );
};
