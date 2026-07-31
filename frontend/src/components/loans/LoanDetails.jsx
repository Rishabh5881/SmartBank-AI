import { motion } from "framer-motion";

import {
X,
CheckCircle,
Calendar
} from "lucide-react";



const LoanDetails = ({
loan,
close
}) => {


if(!loan) return null;



return (

<div

className="
fixed
inset-0
bg-black/60
backdrop-blur-sm
flex
items-center
justify-center
z-50
"

>


<motion.div

initial={{
scale:0.8,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

className="
w-[90%]
max-w-md
bg-slate-900
border
border-white/10
rounded-3xl
p-6
text-white
"

>


<div className="
flex
justify-between
items-center
">


<h2 className="
text-2xl
font-bold
">

Loan Details

</h2>


<button
onClick={close}
>

<X/>

</button>


</div>







<div className="
mt-6
space-y-4
">


<div>

<p className="text-gray-400">
Loan Type
</p>

<h3 className="text-xl font-bold">
{loan.type}
</h3>

</div>





<div>

<p className="text-gray-400">
Remaining Amount
</p>

<h3 className="text-3xl font-bold">
{loan.amount}
</h3>

</div>





<div className="
flex
justify-between
">


<div>

<p className="text-gray-400">
Monthly EMI
</p>

<b>
{loan.emi}
</b>

</div>





<div>

<p className="text-gray-400">
Progress
</p>

<b>
{loan.progress}%
</b>

</div>


</div>







<div className="
bg-green-500/20
rounded-xl
p-4
flex
items-center
gap-3
">


<CheckCircle
className="text-green-400"
/>


<div>

<p>
Status
</p>

<h3 className="
font-bold
text-green-400
">

Active

</h3>

</div>


</div>





<div className="
bg-white/10
rounded-xl
p-4
flex
items-center
gap-3
">


<Calendar/>


<div>

<p className="text-gray-400">
Next EMI
</p>

<h3>
15 August 2026
</h3>


</div>


</div>





</div>





</motion.div>


</div>

);


};


export default LoanDetails;