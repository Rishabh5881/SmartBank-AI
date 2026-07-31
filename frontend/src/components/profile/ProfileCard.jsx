import {
  User,
  Mail,
  Phone,
  Calendar,
  BadgeCheck
} from "lucide-react";

import { motion } from "framer-motion";


const ProfileCard = () => {


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
rounded-3xl
p-8
"

>


{/* User Header */}


<div className="
flex
items-center
gap-6
">


<div className="
w-24
h-24
rounded-full
bg-blue-600
flex
items-center
justify-center
text-3xl
font-bold
">

RS

</div>



<div>


<h2 className="
text-2xl
font-bold
">

Rishabh Sharma

</h2>


<p className="
text-gray-400
">

Premium Account Holder

</p>



<div className="
flex
items-center
gap-2
text-green-400
mt-2
">


<BadgeCheck size={18}/>

KYC Verified


</div>


</div>


</div>






{/* Details */}


<div className="
grid
md:grid-cols-2
gap-5
mt-8
">



<div className="
bg-white/5
p-5
rounded-xl
flex
items-center
gap-4
">


<User/>


<div>

<p className="
text-gray-400
">

Full Name

</p>


<p className="
font-semibold
">

Rishabh Sharma

</p>


</div>


</div>







<div className="
bg-white/5
p-5
rounded-xl
flex
items-center
gap-4
">


<Mail/>


<div>

<p className="
text-gray-400
">

Email

</p>


<p className="
font-semibold
">

rishabh@gmail.com

</p>


</div>


</div>







<div className="
bg-white/5
p-5
rounded-xl
flex
items-center
gap-4
">


<Phone/>


<div>

<p className="
text-gray-400
">

Phone Number

</p>


<p className="
font-semibold
">

+91 XXXXXXX

</p>


</div>


</div>







<div className="
bg-white/5
p-5
rounded-xl
flex
items-center
gap-4
">


<Calendar/>


<div>

<p className="
text-gray-400
">

Member Since

</p>


<p className="
font-semibold
">

2026

</p>


</div>


</div>



</div>



</motion.div>


)


}


export default ProfileCard;