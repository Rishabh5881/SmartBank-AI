import { X } from "lucide-react";
import { useState } from "react";


const TransactionModal = ({
open,
close,
addTransaction
}) => {


const [title,setTitle] = useState("");

const [amount,setAmount] = useState("");

const [type,setType] = useState("income");



if(!open) return null;




const saveTransaction = ()=>{


if(!title || !amount){

alert("Fill all fields");

return;

}



const data = {

title,

date:"Just now",

amount:
type==="income"
?
`+$${amount}`
:
`-$${amount}`,

type

};



addTransaction(data);


setTitle("");

setAmount("");

setType("income");


close();


};





return (

<div className="
fixed
inset-0
z-50
bg-black/70
flex
items-center
justify-center
">


<div className="
bg-slate-900
border
border-white/10
rounded-3xl
p-6
w-[90%]
max-w-md
">



<div className="
flex
justify-between
items-center
">

<h2 className="
text-2xl
font-bold
text-white
">

Add Transaction

</h2>



<button
onClick={close}
className="text-white"
>

<X/>

</button>


</div>





<div className="
mt-6
space-y-4
">


<input

value={title}

onChange={(e)=>setTitle(e.target.value)}

placeholder="Transaction Title"

className="
w-full
p-3
rounded-xl
bg-white/10
text-white
outline-none
"

/>





<input

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

placeholder="Amount"

className="
w-full
p-3
rounded-xl
bg-white/10
text-white
outline-none
"

/>







<div className="
grid
grid-cols-2
gap-3
">


<button

onClick={()=>setType("income")}

className="
bg-green-500
py-3
rounded-xl
"

>

Income

</button>



<button

onClick={()=>setType("expense")}

className="
bg-red-500
py-3
rounded-xl
"

>

Expense

</button>


</div>







<button

onClick={saveTransaction}

className="
w-full
bg-cyan-500
py-3
rounded-xl
font-bold
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