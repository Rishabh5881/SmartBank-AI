import { useState } from "react";
import { X } from "lucide-react";


const TransactionModal = ({
  open,
  close,
  addTransaction
}) => {



const [title,setTitle] = useState("");

const [amount,setAmount] = useState("");

const [type,setType] = useState("income");





if(!open) return null;





const handleSubmit = () => {


if(title === "" || amount === ""){

alert("Please fill all fields");

return;

}





const transaction = {


title:title,

amount:

type === "income"

?

`+$${amount}`

:

`-$${amount}`,



type:type,


date:"Just now"


};




addTransaction(transaction);




setTitle("");

setAmount("");

setType("income");


close();



};









return (


<div

className="
fixed
inset-0
z-50
bg-black/60
backdrop-blur-sm
flex
items-center
justify-center
"

>


<div

className="
w-[90%]
max-w-md
bg-slate-900
border
border-white/10
rounded-3xl
p-6
"

>





{/* Header */}


<div className="
flex
justify-between
items-center
"

>


<h2 className="
text-2xl
font-bold
text-white
">

Add Transaction

</h2>



<button

onClick={close}

className="
text-white
"

>

<X/>

</button>


</div>








{/* Form */}


<div className="
mt-6
space-y-4
"

>



<input


type="text"


placeholder="Transaction Title"


value={title}


onChange={(e)=>setTitle(e.target.value)}


className="
w-full
bg-white/10
border
border-white/10
rounded-xl
p-3
text-white
outline-none
"


/>







<input


type="number"


placeholder="Amount"


value={amount}


onChange={(e)=>setAmount(e.target.value)}


className="
w-full
bg-white/10
border
border-white/10
rounded-xl
p-3
text-white
outline-none
"


/>







<div className="
grid
grid-cols-2
gap-3
"

>



<button


onClick={()=>setType("income")}


className={

`
py-3
rounded-xl
font-semibold

${
type==="income"

?

"bg-green-500 text-white"

:

"bg-white/10 text-gray-300"

}

`

}


>

Income

</button>








<button


onClick={()=>setType("expense")}


className={

`
py-3
rounded-xl
font-semibold

${
type==="expense"

?

"bg-red-500 text-white"

:

"bg-white/10 text-gray-300"

}

`

}


>

Expense

</button>



</div>









<button


onClick={handleSubmit}


className="
w-full
bg-cyan-500
hover:bg-cyan-600
py-3
rounded-xl
font-bold
text-white
"


>


Save Transaction


</button>





</div>





</div>



</div>


);


};



export default TransactionModal;