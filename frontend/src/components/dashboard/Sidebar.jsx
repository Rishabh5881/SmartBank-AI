import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  Bell,
  User,
  Settings,
  LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";



const Sidebar = () => {


const menu = [

{
name:"Dashboard",
icon:LayoutDashboard,
path:"/dashboard"
},

{
name:"Accounts",
icon:Wallet,
path:"#"
},

{
name:"Cards",
icon:CreditCard,
path:"#"
},

{
name:"Transactions",
icon:ArrowLeftRight,
path:"#"
},

{
name:"Notifications",
icon:Bell,
path:"#"
},

{
name:"Profile",
icon:User,
path:"#"
},

{
name:"Settings",
icon:Settings,
path:"#"
}

];




return (

<aside

className="
fixed
left-0
top-0
h-screen
w-72
bg-[#020617]
border-r
border-white/10
p-6
"

>



{/* Logo */}


<div
className="
text-2xl
font-bold
text-white
mb-10
"
>

<span
className="
text-cyan-400
"
>
Smart
</span>

Bank AI

</div>






{/* Menu */}


<nav
className="
space-y-3
"
>


{
menu.map((item,index)=>{


const Icon=item.icon;


return(

<NavLink

key={index}

to={item.path}

className={({isActive})=>

`
flex
items-center
gap-4
rounded-xl
px-4
py-3
transition

${
isActive
?
"bg-blue-600 text-white"
:
"text-slate-400 hover:bg-white/5 hover:text-white"
}

`

}

>


<Icon size={20}/>


<span>

{item.name}

</span>


</NavLink>


)


})
}



</nav>







{/* Logout */}


<button

className="
absolute
bottom-8
left-6
flex
items-center
gap-3
text-red-400
"

>


<LogOut size={20}/>

Logout


</button>





</aside>


)

};


export default Sidebar;