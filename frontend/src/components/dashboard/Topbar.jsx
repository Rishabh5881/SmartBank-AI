import {
  Search,
  Bell,
  UserCircle
} from "lucide-react";



const Topbar = () => {


return (

<header

className="
fixed
top-0
right-0
left-72
h-20
bg-[#020617]/80
border-b
border-white/10
backdrop-blur-xl
z-40
flex
items-center
justify-between
px-8
"

>





{/* Search */}


<div

className="
flex
items-center
gap-3
w-96
rounded-xl
bg-white/5
border
border-white/10
px-4
"

>

<Search
size={20}
className="text-slate-400"
/>


<input

placeholder="Search transactions..."

className="
bg-transparent
outline-none
py-3
w-full
text-white
placeholder:text-slate-500
"

/>


</div>







{/* Right Side */}


<div

className="
flex
items-center
gap-6
"

>



{/* Notification */}


<button

className="
relative
text-slate-300
hover:text-white
"

>


<Bell size={22}/>


<span

className="
absolute
right-0
top-0
h-2
w-2
rounded-full
bg-red-500
"

></span>


</button>







{/* Profile */}


<div

className="
flex
items-center
gap-3
"

>


<UserCircle

size={38}

className="text-cyan-400"

/>



<div>

<p

className="
text-white
font-semibold
"

>

Rishabh

</p>


<p

className="
text-xs
text-slate-400
"

>

Premium User

</p>


</div>



</div>






</div>



</header>


)

};



export default Topbar;