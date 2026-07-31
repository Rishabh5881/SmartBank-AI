import { useState } from "react";
import { motion } from "framer-motion";

import {
  Wallet,
  Eye,
  EyeOff,
  Copy,
  TrendingUp,
  PiggyBank,
  Building2
} from "lucide-react";



const Accounts = () => {


const [showBalance,setShowBalance] = useState(true);



const accounts = [


{
type:"Savings Account",
number:"SB-4589-7821",
balance:"$25,840.50",
icon:<PiggyBank/>,
color:"from-blue-600 to-cyan-400"
},


{
type:"Current Account",
number:"CA-9821-4456",
balance:"$80,250.00",
icon:<Building2/>,
color:"from-purple-600 to-indigo-600"
},


{
type:"Salary Account",
number:"SA-7845-2231",
balance:"$12,500.00",
icon:<Wallet/>,
color:"from-emerald-500 to-green-600"
}


];








const transactions=[

{
title:"Salary Credited",
amount:"+$5000",
date:"Today"
},


{
title:"Amazon Payment",
amount:"-$120",
date:"Yesterday"
},


{
title:"Money Transfer",
amount:"-$800",
date:"2 days ago"
}

];







const copyAccount=(number)=>{

navigator.clipboard.writeText(number);

};







return (

<div

className="
min-h-screen
bg-slate-950
text-white
pt-28
px-6
lg:px-10
pb-10
"

>







{/* HEADER */}


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

>


<h1 className="
text-4xl
font-bold
">

My Accounts 💳

</h1>


<p className="
text-gray-400
mt-2
">

Manage all your SmartBank accounts securely

</p>


</motion.div>









{/* BALANCE CARD */}


<div className="
mt-10
rounded-3xl
p-8
bg-gradient-to-r
from-blue-600
to-cyan-500
shadow-2xl
">


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-white/70
">

Total Balance

</p>



<h2 className="
text-5xl
font-bold
mt-3
">


{

showBalance

?

"$118,590.50"

:

"******"

}


</h2>



</div>




<button

onClick={()=>setShowBalance(!showBalance)}

className="
bg-white/20
p-3
rounded-xl
"

>


{

showBalance

?

<EyeOff/>

:

<Eye/>

}


</button>



</div>





<div className="
flex
items-center
gap-2
mt-6
text-white/80
">


<TrendingUp/>

+12.5% growth this month


</div>




</div>









{/* ACCOUNT CARDS */}



<h2 className="
text-3xl
font-bold
mt-12
">

Your Accounts

</h2>






<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
mt-6
">


{

accounts.map((acc,index)=>(


<motion.div


key={index}


whileHover={{
scale:1.04,
y:-5
}}


className={`
bg-gradient-to-br
${acc.color}
rounded-3xl
p-6
shadow-xl
`}


>



<div className="
flex
justify-between
">


<div className="
w-12
h-12
rounded-xl
bg-white/20
flex
items-center
justify-center
">

{acc.icon}

</div>


</div>






<h3 className="
text-2xl
font-bold
mt-6
">

{acc.type}

</h3>






<p className="
mt-4
text-white/80
">

Account Number

</p>





<div className="
flex
items-center
gap-3
mt-1
">


<p className="
font-semibold
">

{acc.number}

</p>



<button

onClick={()=>copyAccount(acc.number)}

>

<Copy size={18}/>

</button>



</div>






<h2 className="
text-3xl
font-bold
mt-6
">

{acc.balance}

</h2>





</motion.div>


))


}


</div>









{/* ACTIVITY */}



<div className="
mt-14
bg-white/10
border
border-white/10
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
">

Recent Activity

</h2>




<div className="
space-y-4
mt-6
">


{

transactions.map((item,index)=>(


<div

key={index}

className="
flex
justify-between
bg-white/5
rounded-xl
p-4
"


>


<div>

<h3 className="
font-semibold
">

{item.title}

</h3>


<p className="
text-gray-400
text-sm
">

{item.date}

</p>


</div>




<p className={`
font-bold

${
item.amount.includes("+")
?
"text-green-400"
:
"text-red-400"
}

`}>

{item.amount}

</p>



</div>


))


}



</div>




</div>









</div>


);


};


export default Accounts;