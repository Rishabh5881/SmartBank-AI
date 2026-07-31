import { motion } from "framer-motion";

import {
  Wallet,
  TrendingUp,
  Layers,
  ShieldCheck
} from "lucide-react";



const AccountStats = () => {


const stats = [

{
title:"Total Balance",
value:"$24,580",
icon:<Wallet />,
growth:"+12.5%"
},


{
title:"Total Accounts",
value:"03",
icon:<Layers />,
growth:"Active"
},


{
title:"Monthly Growth",
value:"+12.5%",
icon:<TrendingUp />,
growth:"This Month"
},


{
title:"Account Security",
value:"Excellent",
icon:<ShieldCheck />,
growth:"Protected"
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
p-5
backdrop-blur-xl
"


>


<div className="
w-12
h-12
rounded-xl
bg-cyan-500/20
flex
items-center
justify-center
text-cyan-400
">


{item.icon}


</div>




<h3 className="
text-gray-400
mt-5
">

{item.title}

</h3>



<h2 className="
text-3xl
font-bold
mt-2
">

{item.value}

</h2>



<p className="
text-green-400
mt-2
text-sm
">

{item.growth}

</p>



</motion.div>


))


}



</div>


);


};


export default AccountStats;