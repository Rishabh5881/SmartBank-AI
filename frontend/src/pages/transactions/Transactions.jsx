import { useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  CreditCard,
  Filter
} from "lucide-react";



const Transactions = () => {



const [search,setSearch] = useState("");

const [filter,setFilter] = useState("All");





const transactions = [


{
title:"Salary Credited",
category:"Income",
amount:"+$5000",
date:"28 July 2026",
status:"Completed",
icon:<Wallet/>
},


{
title:"Amazon Purchase",
category:"Expense",
amount:"-$120",
date:"27 July 2026",
status:"Completed",
icon:<CreditCard/>
},


{
title:"Money Transfer",
category:"Expense",
amount:"-$800",
date:"25 July 2026",
status:"Pending",
icon:<ArrowUpRight/>
},


{
title:"Freelance Payment",
category:"Income",
amount:"+$1500",
date:"20 July 2026",
status:"Completed",
icon:<ArrowDownLeft/>
}


];







const filteredTransactions = transactions.filter((item)=>{


const searchMatch =
item.title
.toLowerCase()
.includes(search.toLowerCase());



const filterMatch =

filter==="All"

?

true

:

item.category===filter;



return searchMatch && filterMatch;


});









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

Transactions 💸

</h1>


<p className="
text-gray-400
mt-2
">

Track all your banking activities

</p>


</motion.div>











{/* STATS */}



<div className="
grid
md:grid-cols-3
gap-6
mt-10
">





<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
">


<p className="
text-gray-400
">

Total Income

</p>


<h2 className="
text-4xl
font-bold
text-green-400
mt-3
">

+$6500

</h2>


</div>








<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
">


<p className="
text-gray-400
">

Total Expense

</p>


<h2 className="
text-4xl
font-bold
text-red-400
mt-3
">

-$920

</h2>


</div>







<div className="
bg-gradient-to-r
from-blue-600
to-cyan-500
rounded-3xl
p-6
">


<p>

Current Balance

</p>


<h2 className="
text-4xl
font-bold
mt-3
">

$118,590

</h2>


</div>




</div>









{/* SEARCH FILTER */}



<div className="
flex
flex-col
md:flex-row
gap-4
mt-12
">



<div className="
flex
items-center
gap-3
bg-white/10
border
border-white/10
rounded-xl
px-4
flex-1
">


<Search/>

<input

placeholder="Search transaction..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
bg-transparent
outline-none
w-full
py-3
"

/>


</div>






<div className="
flex
items-center
gap-3
">


<Filter/>


<select

value={filter}

onChange={(e)=>setFilter(e.target.value)}

className="
bg-slate-900
border
border-white/10
rounded-xl
px-5
py-3
"

>


<option>
All
</option>


<option>
Income
</option>


<option>
Expense
</option>


</select>



</div>





</div>









{/* TRANSACTION LIST */}



<div className="
mt-10
space-y-5
">


{

filteredTransactions.map((item,index)=>(


<motion.div


key={index}


whileHover={{
scale:1.02
}}


className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
flex
items-center
justify-between
backdrop-blur-xl
"


>



<div className="
flex
items-center
gap-5
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

{item.icon}

</div>





<div>


<h3 className="
text-xl
font-semibold
">

{item.title}

</h3>


<p className="
text-gray-400
">

{item.date}

</p>


</div>



</div>








<div className="
text-right
">


<h3 className={`
text-2xl
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

</h3>




<span className="
text-xs
bg-white/10
px-3
py-1
rounded-full
">

{item.status}

</span>



</div>






</motion.div>


))


}



</div>









</div>


);


};


export default Transactions;