import { motion } from "framer-motion";

import {
CreditCard
} from "lucide-react";



const VirtualCard = () => {


return (

<motion.div

whileHover={{
scale:1.03
}}

className="
relative
overflow-hidden
rounded-3xl
p-8
bg-gradient-to-br
from-blue-700
via-indigo-600
to-purple-700
shadow-2xl
text-white
"


>


<div className="
flex
justify-between
items-center
">


<div className="
flex
items-center
gap-2
">

<CreditCard/>

<h2 className="
text-xl
font-bold
">

SmartBank AI

</h2>


</div>



<h2 className="
font-bold
">

VISA

</h2>


</div>







<div className="
mt-10
text-3xl
tracking-widest
font-semibold
">

4589 **** **** 7821

</div>







<div className="
flex
justify-between
mt-10
">


<div>

<p className="
text-white/70
text-sm
">

Card Holder

</p>


<h3>

RISHABH SHARMA

</h3>


</div>





<div>

<p className="
text-white/70
text-sm
">

Expiry

</p>


<h3>

12/29

</h3>


</div>



</div>





</motion.div>

);


};


export default VirtualCard;