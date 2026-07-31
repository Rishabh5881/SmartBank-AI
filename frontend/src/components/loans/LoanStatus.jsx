import { motion } from "framer-motion";

import {
  CheckCircle,
  Clock,
  FileText,
  Banknote
} from "lucide-react";



const LoanStatus = () => {



const steps = [

{
title:"Application Submitted",
desc:"Your loan application has been received",
icon:<FileText/>
},

{
title:"Under Review",
desc:"Bank is verifying your documents",
icon:<Clock/>
},

{
title:"Approved",
desc:"Loan approved by bank",
icon:<CheckCircle/>
},

{
title:"Amount Disbursed",
desc:"Money credited to your account",
icon:<Banknote/>
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


<h2 className="
text-2xl
font-bold
">

Loan Application Status

</h2>



<div className="
mt-8
space-y-6
">


{

steps.map((step,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
x:-20
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:index*0.2
}}

className="
flex
gap-4
items-start
"

>


<div className="
w-12
h-12
rounded-full
bg-cyan-500/20
text-cyan-400
flex
items-center
justify-center
">

{step.icon}

</div>





<div>

<h3 className="
font-bold
text-lg
">

{step.title}

</h3>


<p className="
text-gray-400
">

{step.desc}

</p>


</div>





</motion.div>


))


}



</div>





</div>

);


};


export default LoanStatus;