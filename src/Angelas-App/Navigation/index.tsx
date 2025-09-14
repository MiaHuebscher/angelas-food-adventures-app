import { FaRegCircleUser, FaPeopleRoof } from "react-icons/fa6";
import { TbDatabaseCog } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import './Navigation.css';

export default function Navigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Map", path: "/Map", icon: FaMapMarkedAlt },
    { label: "People",   path: "/People", icon: FaPeopleRoof },
    { label: "Data",   path: "/Data", icon: TbDatabaseCog }
  ];
  return (
    <div id="wd-kanbas-navigation" className="list-group rounded-0">
      <Link key="/Kanbas/Account" to="/Account" className={`list-group-item text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white icon-color" : "bg-black text-white"}`}>
        <FaRegCircleUser className="fs-1 icon-color" />
        <br />
        Account
      </Link>
      {links.map((link) => (
        <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
              ${pathname.includes(link.label) ? "icon-color bg-white" : "text-white bg-black"}`}>
          {link.icon({ className: "fs-1 icon-color"})}
          <br />
          {link.label}
        </Link>
      ))}
    </div>
);}
