import { motion } from "framer-motion";
import { X } from "lucide-react";


const MobileMenu = ({open,setOpen}) => {


if(!open) return null;


return (

<motion.div

initial={{
x:"100%"
}}

animate={{
x:0
}}

exit={{
x:"100%"
}}

transition={{
duration:0.4
}}

className="
fixed
top-0
right-0
w-[80%]
h-screen
bg-slate-950
z-50
p-8
"

>


<div className="flex justify-between">

<h2 className="text-white text-xl font-bold">
SmartBank AI
</h2>


<X
className="text-white cursor-pointer"
onClick={()=>setOpen(false)}
/>


</div>


<div className="mt-10 space-y-6">

{
[
"Home",
"Features",
"Security",
"AI",
"Pricing"
].map(item=>(

<p 
key={item}
className="
text-slate-300
text-lg
hover:text-blue-500
cursor-pointer
"
>
{item}

</p>

))
}


</div>


</motion.div>

)


}


export default MobileMenu;