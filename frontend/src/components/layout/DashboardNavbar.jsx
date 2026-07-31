import { 
  Link, 
  useNavigate 
} from "react-router-dom";

import {
  useState
} from "react";

import {
  ChevronDown,
  User,
  Settings,
  LogOut
} from "lucide-react";



const DashboardNavbar = () => {


const navigate = useNavigate();


const [open,setOpen] = useState(false);



const user = JSON.parse(
localStorage.getItem("user")
);



const logout = ()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};




return (

<nav

className="
fixed
top-0
z-50
w-full
border-b
border-white/10
bg-slate-950/70
backdrop-blur-xl
"

>


<div

className="
mx-auto
max-w-7xl
flex
items-center
justify-between
px-6
py-5
"

>





{/* Logo */}

<Link

to="/dashboard"

className="
text-2xl
font-bold
text-white
"

>

SmartBank

<span className="text-blue-400">

AI

</span>

</Link>









{/* Links */}

<div

className="
hidden
lg:flex
items-center
gap-8
"

>


<Link to="/dashboard"
className="text-slate-300 hover:text-white transition">

Dashboard

</Link>



<Link to="/accounts"
className="text-slate-300 hover:text-white transition">

Accounts

</Link>



<Link to="/transactions"
className="text-slate-300 hover:text-white transition">

Transactions

</Link>



<Link to="/cards"
className="text-slate-300 hover:text-white transition">

Cards

</Link>



<Link to="/loans"
className="text-slate-300 hover:text-white transition">

Loans

</Link>



<Link to="/notifications"
className="text-slate-300 hover:text-white transition">

Notifications

</Link>



</div>









{/* Profile Dropdown */}


<div

className="
relative
"

>


<button

onClick={()=>setOpen(!open)}

className="
flex
items-center
gap-3
rounded-xl
border
border-white/10
bg-white/5
px-4
py-2
hover:bg-white/10
transition
"

>


<div

className="
h-10
w-10
rounded-full
bg-gradient-to-r
from-blue-600
to-cyan-400
flex
items-center
justify-center
text-white
font-bold
"

>

{user?.name?.charAt(0) || "U"}

</div>




<div className="hidden md:block text-left">


<p className="text-white font-semibold">

{user?.name || "User"}

</p>


<p className="text-xs text-slate-400">

Customer

</p>


</div>




<ChevronDown

size={18}

className="
text-slate-400
"

/>



</button>









{/* Dropdown */}

{

open &&

(

<div

className="
absolute
right-0
mt-3
w-56
rounded-2xl
border
border-white/10
bg-slate-900
p-3
shadow-2xl
"

>



<Link

to="/profile"

className="
flex
items-center
gap-3
rounded-xl
px-4
py-3
text-slate-300
hover:bg-white/10
hover:text-white
"

>

<User size={18}/>

Profile

</Link>







<Link

to="/settings"

className="
flex
items-center
gap-3
rounded-xl
px-4
py-3
text-slate-300
hover:bg-white/10
hover:text-white
"

>

<Settings size={18}/>

Settings

</Link>







<button

onClick={logout}

className="
flex
w-full
items-center
gap-3
rounded-xl
px-4
py-3
text-red-400
hover:bg-red-500/10
"

>

<LogOut size={18}/>

Logout

</button>





</div>

)

}



</div>






</div>


</nav>


);


};



export default DashboardNavbar;