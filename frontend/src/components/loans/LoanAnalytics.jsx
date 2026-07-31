import { motion } from "framer-motion";

import {
  Wallet,
  TrendingDown,
  Percent,
  Target
} from "lucide-react";



const LoanAnalytics = () => {



const analytics = [

{
title:"Total Loan",
value:"$160,000",
icon:<Wallet size={26}/>,
color:"from-blue-600 to-cyan-400"
},


{
title:"Paid Amount",
value:"$85,000",
icon:<Target size={26}/>,
color:"from-green-500 to-emerald-600"
},


{
title:"Remaining",
value:"$75,000",
icon:<TrendingDown size={26}/>,
color:"from-red-500 to-orange-500"
},


{
title:"Interest Paid",
value:"$12,500",
icon:<Percent size={26}/>,
color:"from-purple-500 to-indigo-600"
}

];





return (

<div

className="
mt-10
"

>


<h2 className="
text-3xl
font-bold
">

Loan Analytics 📊

</h2>





<div

className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-6
mt-6
"

>


{

analytics.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.1
}}


className={`
bg-gradient-to-br
${item.color}
rounded-3xl
p-6
shadow-xl
text-white
`}

>


<div className="
w-12
h-12
rounded-xl
bg-white/20
flex
items-center
justify-center
">

{item.icon}

</div>




<p className="
mt-5
text-white/80
">

{item.title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{item.value}

</h2>



</motion.div>


))


}



</div>





{/* Progress */}


<div className="
mt-8
bg-white/10
rounded-3xl
p-6
border
border-white/10
">


<div className="
flex
justify-between
mb-3
">


<h3 className="
font-bold
text-xl
">

Repayment Progress

</h3>


<span className="
text-cyan-400
font-bold
">

53%

</span>


</div>





<div className="
w-full
h-4
bg-white/10
rounded-full
overflow-hidden
">


<div

className="
h-full
w-[53%]
bg-gradient-to-r
from-cyan-400
to-blue-600
rounded-full
"

/>


</div>



</div>





</div>


);


};


export default LoanAnalytics;
