import { motion } from "framer-motion";

import {
  ShieldCheck,
  FileCheck,
  Lock
} from "lucide-react";



const KYCStatus = () => {


const items = [

{
title:"KYC Verification",
value:"Verified ✅",
icon:<ShieldCheck/>
},


{
title:"Documents",
value:"Completed",
icon:<FileCheck/>
},


{
title:"Security Level",
value:"High",
icon:<Lock/>
}

];





return (

<motion.div

whileHover={{
scale:1.02
}}

className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
"


>


<h2 className="
text-2xl
font-bold
">

KYC & Security Status 🛡️

</h2>



<div className="
mt-6
space-y-4
">


{

items.map((item,index)=>(


<div

key={index}

className="
flex
items-center
gap-4
bg-white/5
rounded-2xl
p-4
"

>


<div className="
w-12
h-12
rounded-xl
bg-green-500/20
text-green-400
flex
items-center
justify-center
">

{item.icon}

</div>




<div>


<p className="
text-gray-400
">

{item.title}

</p>


<h3 className="
font-semibold
">

{item.value}

</h3>


</div>



</div>


))


}



</div>




</motion.div>


);


};


export default KYCStatus;