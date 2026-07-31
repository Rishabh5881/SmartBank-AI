import { motion } from "framer-motion";

import {
  Wallet,
  Home,
  CreditCard,
  TrendingUp
} from "lucide-react";



const LoanStats = () => {



const stats = [

{
title:"Total Loans",
value:"$50,000",
desc:"Approved Amount",
icon:<Wallet/>
},


{
title:"Active Loans",
value:"03",
desc:"Running Loans",
icon:<Home/>
},


{
title:"Monthly EMI",
value:"$1,250",
desc:"Due This Month",
icon:<CreditCard/>
},


{
title:"Credit Score",
value:"780",
desc:"Excellent",
icon:<TrendingUp/>
}

];





return (

<div className="
grid
md:grid-cols-2
xl:grid-cols-4
gap-5
mt-8
">


{

stats.map((item,index)=>(


<motion.div

key={index}

whileHover={{
scale:1.04
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


<div className="
w-12
h-12
rounded-xl
bg-white/10
text-cyan-400
flex
items-center
justify-center
">


{item.icon}


</div>




<p className="
text-gray-400
mt-5
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




<p className="
text-sm
text-gray-400
mt-1
">

{item.desc}

</p>



</motion.div>


))


}



</div>


);


};


export default LoanStats;