import { motion } from "framer-motion";

import {
  Wallet,
  Building2,
  Landmark,
  CheckCircle
} from "lucide-react";



const AccountCard = ({
  type,
  number,
  balance,
  color,
  onClick
}) => {



const getIcon = () => {

  if(type.includes("Savings"))
    return <Wallet size={28}/>;


  if(type.includes("Current"))
    return <Building2 size={28}/>;


  return <Landmark size={28}/>;

};





return (


<motion.div


initial={{
opacity:0,
y:20
}}


animate={{
opacity:1,
y:0
}}


whileHover={{
scale:1.04
}}


className={`
relative
overflow-hidden
rounded-3xl
p-6
text-white
bg-gradient-to-br
${color}
shadow-2xl
cursor-pointer
`}


>





{/* Glow Effect */}


<div

className="
absolute
-right-10
-top-10
w-40
h-40
bg-white/20
rounded-full
blur-3xl
"

/>









<div className="
relative
z-10
">








{/* Header */}


<div className="
flex
justify-between
items-center
">





<div className="
w-14
h-14
rounded-2xl
bg-white/20
flex
items-center
justify-center
">

{getIcon()}

</div>







<div className="
flex
items-center
gap-2
bg-green-500/20
px-3
py-1
rounded-full
text-green-200
text-sm
">

<CheckCircle size={16}/>

Active

</div>





</div>









{/* Account Type */}


<h2 className="
text-2xl
font-bold
mt-6
">

{type}

</h2>








<p className="
text-white/70
mt-2
">

Account Number

</p>





<h3 className="
tracking-widest
text-lg
font-semibold
">

{number}

</h3>









{/* Balance */}


<div className="
mt-8
">


<p className="
text-white/70
">

Available Balance

</p>



<h1 className="
text-4xl
font-bold
mt-1
">

{balance}

</h1>



</div>









{/* Button */}


<button

onClick={onClick}

className="
mt-6
cursor-pointer
bg-white/20
hover:bg-white/30
transition
px-5
py-2
rounded-xl
text-sm
font-semibold
"

>

View Details

</button>







</div>





</motion.div>


);


};


export default AccountCard;