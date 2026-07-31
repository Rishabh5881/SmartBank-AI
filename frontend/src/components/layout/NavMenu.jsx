import { NavLink } from "react-router-dom";


const links = [
    "Home",
    "Features",
    "Security",
    "AI",
    "Analytics",
    "Pricing"
];


const NavMenu = () => {


return (

<nav className="hidden md:flex items-center gap-8">


{
links.map((item)=>(

<NavLink
key={item}
to="/"
className={({isActive})=>
`
relative text-sm font-medium
transition-all duration-300

${
isActive 
? "text-blue-500"
:"text-slate-300 hover:text-white"
}

group
`
}
>

{item}


<span
className="
absolute
-left-0
-bottom-2
h-[2px]
w-0
bg-blue-500
transition-all
duration-300

group-hover:w-full

"
/>


</NavLink>

))
}


</nav>


)


}


export default NavMenu;