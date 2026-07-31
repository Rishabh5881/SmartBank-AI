import { motion } from "framer-motion";

import {
  CreditCard,
  Wifi
} from "lucide-react";


const BankCard = ({
type,
number,
holder,
expiry,
color,
frozen,
onClick
}) => {


return (

<motion.div

whileHover={{
scale:1.03,
y:-5
}}

transition={{
duration:0.3
}}

onClick={onClick}

className={`
relative
overflow-hidden
rounded-3xl
p-6
h-64
text-white
bg-gradient-to-br
${color}
shadow-2xl
cursor-pointer

${frozen ? "opacity-60 grayscale" : ""}
`}

>


{/* Background Glow */}

<div

className="
absolute
- right-10
- top-10
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
h-full
">





{/* Header */}


<div className="
flex
justify-between
items-center
">


<div className="
flex
items-center
gap-3
">


<CreditCard size={30}/>


<h2 className="
font-bold
text-xl
">

SmartBank

</h2>


</div>



<Wifi size={28}/>


</div>







{/* Chip */}

<div className="
mt-8
w-12
h-8
bg-yellow-300
rounded-md
shadow-inner
">

</div>








{/* Number */}


<h3 className="
tracking-[4px]
text-xl
mt-5
font-semibold
">

{number}

</h3>








{/* Bottom */}


<div className="
flex
justify-between
mt-7
">


<div>

<p className="
text-white/70
text-xs
uppercase
">

Card Holder

</p>


<h3 className="
font-semibold
">

{holder}

</h3>


</div>





<div>

<p className="
text-white/70
text-xs
uppercase
">

Expiry

</p>


<h3 className="
font-semibold
">

{expiry}

</h3>


</div>



</div>








{/* Type Badge */}


<div className="
absolute
bottom-5
right-5
bg-white/20
px-3
py-1
rounded-full
text-sm
backdrop-blur-md
">

{type}

</div>




</div>


</motion.div>


);


};


export default BankCard;