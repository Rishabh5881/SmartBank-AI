import {
  Lock,
  ShieldCheck,
  Smartphone,
  Clock
} from "lucide-react";

import { motion } from "framer-motion";


const SecuritySettings = () => {


return (

<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="
bg-white/10
border
border-white/10
rounded-2xl
p-6
"

>



<div className="
flex
items-center
gap-3
">


<ShieldCheck
size={30}
className="text-green-400"
/>


<h2 className="
text-xl
font-semibold
">

Security Settings

</h2>


</div>







{/* Password */}


<div className="
mt-6
bg-white/5
rounded-xl
p-4
flex
items-center
gap-4
">


<Lock/>


<div>

<p className="
text-gray-400
">

Password

</p>


<p className="
font-semibold
">

********

</p>


</div>


</div>








{/* Two Factor */}



<div className="
mt-4
bg-white/5
rounded-xl
p-4
flex
items-center
justify-between
">


<div className="
flex
items-center
gap-4
">


<Smartphone/>


<div>

<p className="
text-gray-400
">

Two Factor Authentication

</p>


<p className="
font-semibold
">

Enabled

</p>


</div>


</div>




<div className="
bg-green-600
px-3
py-1
rounded-full
text-sm
">

ON

</div>


</div>








{/* Login Activity */}



<div className="
mt-4
bg-white/5
rounded-xl
p-4
flex
items-center
gap-4
">


<Clock/>


<div>

<p className="
text-gray-400
">

Recent Login

</p>


<p className="
font-semibold
">

Chrome Windows - Today 10:30 AM

</p>


</div>


</div>








<button

className="
mt-6
bg-blue-600
px-5
py-3
rounded-xl
hover:bg-blue-700
transition
"

>

Manage Security

</button>





</motion.div>


)

}


export default SecuritySettings;