import { motion } from "framer-motion";

import {
  TrendingUp
} from "lucide-react";



const SpendingLimit = () => {


const used = 3200;

const limit = 5000;

const percentage = (used / limit) * 100;



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
p-6
mt-8
backdrop-blur-xl
"

>



<div className="
flex
justify-between
items-center
">


<div>


<h2 className="
text-2xl
font-bold
">

Monthly Spending Limit

</h2>


<p className="
text-gray-400
mt-1
">

Track your card usage

</p>


</div>




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

<TrendingUp/>

</div>



</div>








<div className="
mt-8
flex
justify-between
">


<div>

<p className="
text-gray-400
">

Used

</p>


<h3 className="
text-3xl
font-bold
">

$3,200

</h3>


</div>





<div className="
text-right
">


<p className="
text-gray-400
">

Limit

</p>


<h3 className="
text-3xl
font-bold
">

$5,000

</h3>


</div>


</div>







<div className="
mt-6
w-full
h-4
bg-white/10
rounded-full
overflow-hidden
">


<div

style={{
width:`${percentage}%`
}}

className="
h-full
bg-gradient-to-r
from-cyan-400
to-blue-600
rounded-full
"

/>


</div>





<p className="
mt-4
text-gray-400
">

64% of your monthly limit used

</p>





</motion.div>


);


};


export default SpendingLimit;