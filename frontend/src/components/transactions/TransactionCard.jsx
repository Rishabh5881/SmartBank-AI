import { motion } from "framer-motion";

import {
  ArrowDownLeft,
  ArrowUpRight
} from "lucide-react";



const TransactionCard = ({
title,
date,
amount,
type,
onClick
}) => {


const income = type === "income";



return (

<motion.div

onClick={onClick}

whileHover={{
scale:1.02
}}

className="
cursor-pointer
bg-white/10
border
border-white/10
rounded-2xl
p-5
flex
justify-between
items-center
backdrop-blur-xl
"

>



<div className="
flex
items-center
gap-4
">


<div

className={`
w-12
h-12
rounded-xl
flex
items-center
justify-center

${
income
?
"bg-green-500/20 text-green-400"
:
"bg-red-500/20 text-red-400"
}

`}

>


{

income

?

<ArrowDownLeft/>

:

<ArrowUpRight/>

}


</div>





<div>


<h3 className="
font-semibold
text-lg
">

{title}

</h3>



<p className="
text-gray-400
text-sm
">

{date}

</p>



</div>



</div>








<h2

className={`
text-xl
font-bold

${
income
?
"text-green-400"
:
"text-red-400"
}

`}

>


{
income
?
"+"
:
"-"
}

{amount}


</h2>






</motion.div>


);


};


export default TransactionCard;