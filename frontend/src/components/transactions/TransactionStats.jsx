import { motion } from "framer-motion";

import {
Wallet,
ArrowDownLeft,
ArrowUpRight,
Activity
} from "lucide-react";




const TransactionStats = () => {


const stats = [


{
title:"Current Balance",
value:"$24,580",
icon:<Wallet/>,
color:"text-cyan-400"
},


{
title:"Total Income",
value:"$8,500",
icon:<ArrowDownLeft/>,
color:"text-green-400"
},


{
title:"Total Expense",
value:"$2,300",
icon:<ArrowUpRight/>,
color:"text-red-400"
},


{
title:"Transactions",
value:"128",
icon:<Activity/>,
color:"text-purple-400"
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


<div

className={`
w-12
h-12
rounded-xl
bg-white/10
flex
items-center
justify-center
${item.color}
`}

>

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



</motion.div>


))


}



</div>


);


};


export default TransactionStats;