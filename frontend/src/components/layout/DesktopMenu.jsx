const links = [
  "Home",
  "Features",
  "Security",
  "AI",
  "Analytics",
  "Pricing",
];

const DesktopMenu = () => {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      {links.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="
            text-sm
            font-medium
            text-slate-300
            transition
            hover:text-white
            relative
            after:absolute
            after:left-0
            after:-bottom-2
            after:h-[2px]
            after:w-0
            after:bg-blue-500
            after:transition-all
            after:duration-300
            hover:after:w-full
          "
        >
          {item}
        </a>
      ))}
    </nav>
  );
};

export default DesktopMenu;