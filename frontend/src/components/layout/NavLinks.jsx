import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/#features" },
  { name: "Services", path: "/#services" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "FAQ", path: "/#faq" },
];

export default function NavLinks() {
  return (
    <div className="hidden items-center gap-8 lg:flex">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className="font-medium text-slate-600 transition hover:text-blue-600"
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}