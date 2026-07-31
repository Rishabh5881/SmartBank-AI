import { motion } from "framer-motion";

import {
  Bell,
  CheckCircle,
  Clock,
  FileCheck
} from "lucide-react";



const LoanNotifications = () => {



const notifications = [

{
title:"EMI Payment Due",
message:"Your next EMI of $1,200 is due on 10 August 2026",
type:"warning",
icon:<Clock/>
},


{
title:"Loan Payment Successful",
message:"Your July EMI payment was completed successfully",
type:"success",
icon:<CheckCircle/>
},


{
title:"Documents Verified",
message:"Your KYC documents have been approved",
type:"success",
icon:<FileCheck/>
},


{
title:"Loan Approved",
message:"Your loan application has been approved",
type:"success",
icon:<CheckCircle/>
}

];






return (

<div

className="
mt-10
bg-white/10
border
border-white/10
rounded-3xl
p-6
"

>



<div className="
flex
items-center
gap-3
">


<Bell className="text-cyan-400"/>


<h2 className="
text-2xl
font-bold
">

Loan Notifications

</h2>


</div>








<div className="
mt-6
space-y-4
">


{

notifications.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
x:20
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:index*0.15
}}


className={`
p-4
rounded-2xl
flex
gap-4
items-start

${
item.type==="success"

?

"bg-green-500/20"

:

"bg-yellow-500/20"

}

`}


>


<div className="
w-10
h-10
rounded-xl
bg-white/10
flex
items-center
justify-center
">

{item.icon}

</div>





<div>


<h3 className="
font-bold
">

{item.title}

</h3>


<p className="
text-gray-300
text-sm
mt-1
">

{item.message}

</p>


</div>





</motion.div>


))


}



</div>





</div>

);


};


export default LoanNotifications;