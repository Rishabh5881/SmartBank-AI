import { motion } from "framer-motion";

import {
  X,
  Trash2,
  Snowflake,
  Unlock,
  CreditCard,
  ShieldCheck
} from "lucide-react";


const CardDetails = ({
  card,
  close,
  onDelete,
  onFreeze
}) => {


if(!card) return null;



return (

<div className="
fixed
inset-0
bg-black/70
backdrop-blur-md
flex
items-center
justify-center
z-50
px-5
">


<motion.div

initial={{
scale:0.8,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

className="
bg-slate-900
border
border-white/10
rounded-3xl
p-7
w-full
max-w-lg
text-white
shadow-2xl
"


>





{/* Header */}


<div className="
flex
justify-between
items-center
">


<div>

<h2 className="
text-2xl
font-bold
">

Card Details 💳

</h2>


<p className="
text-gray-400
text-sm
">

Manage your card securely

</p>


</div>




<button

onClick={close}

className="
p-2
rounded-full
hover:bg-white/10
transition
"

>

<X/>

</button>


</div>









{/* Card Preview */}


<div className={`

mt-6
rounded-3xl
p-5
bg-gradient-to-br
${card.color}
h-48

`}>


<div className="
flex
justify-between
">

<CreditCard/>

<p className="
text-sm
bg-white/20
px-3
py-1
rounded-full
">

{card.type}

</p>


</div>



<h2 className="
mt-8
tracking-widest
text-xl
">

{card.number}

</h2>



<div className="
flex
justify-between
mt-5
text-sm
">


<div>

<p className="
opacity-70
">

Holder

</p>

<p>
{card.holder}
</p>


</div>




<div>

<p className="
opacity-70
">

Expiry

</p>

<p>
{card.expiry}
</p>


</div>



</div>


</div>










{/* Status */}


<div className="
mt-6
grid
grid-cols-2
gap-4
">


<div className="
bg-white/10
rounded-2xl
p-4
">


<p className="
text-gray-400
text-sm
">

Status

</p>


<div className={`
flex
items-center
gap-2
mt-2
font-semibold

${card.frozen
?
"text-red-400"
:
"text-green-400"
}

`}>

{

card.frozen

?

<Unlock size={18}/>

:

<ShieldCheck size={18}/>

}


{

card.frozen

?

"Frozen"

:

"Active"

}


</div>


</div>







<div className="
bg-white/10
rounded-2xl
p-4
">


<p className="
text-gray-400
text-sm
">

Limit

</p>


<h3 className="
font-bold
mt-2
">

$25,000

</h3>


</div>



</div>









{/* Actions */}


<div className="
flex
gap-4
mt-8
">


<button

onClick={()=>onFreeze(card)}

className="
flex-1
bg-blue-600
hover:bg-blue-700
py-3
rounded-xl
flex
items-center
justify-center
gap-2
transition
"

>


<Snowflake size={18}/>


{

card.frozen

?
"Unfreeze"

:
"Freeze"

}


</button>







<button

onClick={()=>onDelete(card)}

className="
flex-1
bg-red-600
hover:bg-red-700
py-3
rounded-xl
flex
items-center
justify-center
gap-2
transition
"

>


<Trash2 size={18}/>

Delete

</button>




</div>





</motion.div>


</div>


);


};


export default CardDetails;