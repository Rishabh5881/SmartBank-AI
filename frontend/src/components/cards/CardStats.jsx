import { motion } from "framer-motion";

import {
  CreditCard,
  ShieldCheck,
  Wallet,
  TrendingUp
} from "lucide-react";



const CardStats = () => {


const stats = [

{
title:"Total Cards",
value:"02",
icon:<CreditCard />,
desc:"Active Cards"
},


{
title:"Card Limit",
value:"$50,000",
icon:<Wallet />,
desc:"Monthly Limit"
},


{
title:"Security Score",
value:"98%",
icon:<ShieldCheck />,
desc:"Excellent"
},


{
title:"Cashback",
value:"$450",
icon:<TrendingUp />,
desc:"Available Rewards"
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
flex
items-center
justify-center
text-cyan-400
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


export default CardStats;