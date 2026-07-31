import { motion } from "framer-motion";

import {
  CheckCircle,
  Clock,
  CreditCard
} from "lucide-react";



const RepaymentHistory = () => {



const payments = [

{
date:"10 July 2026",
amount:"$1,200",
status:"Paid"
},

{
date:"10 June 2026",
amount:"$1,200",
status:"Paid"
},

{
date:"10 August 2026",
amount:"$1,200",
status:"Upcoming"
},

{
date:"10 September 2026",
amount:"$1,200",
status:"Upcoming"
}

];





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


<CreditCard
className="text-cyan-400"
/>


<h2 className="
text-2xl
font-bold
">

Repayment History

</h2>


</div>







<div className="
mt-6
space-y-4
">


{

payments.map((payment,index)=>(


<div

key={index}

className="
flex
justify-between
items-center
bg-white/5
rounded-2xl
p-4
"

>


<div>

<h3 className="
font-semibold
">

EMI Payment

</h3>


<p className="
text-gray-400
text-sm
">

{payment.date}

</p>


</div>






<div className="
text-right
">


<h3 className="
font-bold
">

{payment.amount}

</h3>



<div className="
flex
items-center
gap-2
justify-end
mt-1
">


{

payment.status==="Paid"

?

<CheckCircle
size={18}
className="text-green-400"
/>

:

<Clock
size={18}
className="text-yellow-400"
/>

}



<span

className={

payment.status==="Paid"

?

"text-green-400"

:

"text-yellow-400"

}

>

{payment.status}

</span>


</div>



</div>





</div>


))


}



</div>






</motion.div>

);


};


export default RepaymentHistory;