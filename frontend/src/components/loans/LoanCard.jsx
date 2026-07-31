import { motion } from "framer-motion";

import {
  Home,
  Car,
  GraduationCap,
  Banknote
} from "lucide-react";



const LoanCard = ({
  type,
  amount,
  emi,
  progress
}) => {



const icon = {

  "Home Loan": <Home size={26}/>,
  "Car Loan": <Car size={26}/>,
  "Education Loan": <GraduationCap size={26}/>

};



return (

<motion.div

whileHover={{
  scale:1.03
}}

className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
text-white
backdrop-blur-xl
"


>


<div className="
flex
items-center
gap-4
">


<div className="
w-14
h-14
rounded-2xl
bg-cyan-500/20
text-cyan-400
flex
items-center
justify-center
">


{
icon[type] || <Banknote/>
}


</div>




<div>

<h2 className="
text-xl
font-bold
">

{type}

</h2>


<p className="
text-gray-400
">

Active Loan

</p>


</div>


</div>







<div className="
mt-6
">


<p className="
text-gray-400
">

Remaining Amount

</p>


<h1 className="
text-3xl
font-bold
">

{amount}

</h1>


</div>








<div className="
flex
justify-between
mt-5
">


<span>
Monthly EMI
</span>


<span className="
font-bold
">

{emi}

</span>


</div>








<div className="
mt-5
h-3
bg-white/10
rounded-full
overflow-hidden
">


<div

style={{
width:`${progress}%`
}}

className="
h-full
bg-gradient-to-r
from-cyan-400
to-blue-600
"

/>


</div>





<p className="
text-sm
text-gray-400
mt-2
">

{progress}% Paid

</p>






</motion.div>


);


};


export default LoanCard;