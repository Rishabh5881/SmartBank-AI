import { useState, useEffect } from "react";
import { X } from "lucide-react";


const EditTransactionModal = ({
  open,
  close,
  transaction,
  updateTransaction
}) => {


const [form,setForm] = useState({

title:"",
amount:"",
type:"income"

});





useEffect(()=>{

if(transaction){

setForm({

title:transaction.title,

amount:transaction.amount.replace("$",""),

type:transaction.type

});

}

},[transaction]);







if(!open || !transaction){
return null;
}







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};








const handleSubmit=(e)=>{

e.preventDefault();


updateTransaction({

...transaction,

title:form.title,

amount:"$"+form.amount,

type:form.type

});


close();


};







return (

<div

className="
fixed
inset-0
z-50
bg-black/70
flex
items-center
justify-center
"

>


<div

className="
bg-slate-900
border
border-white/10
rounded-3xl
p-6
w-[90%]
max-w-md
text-white
"

>


<div

className="
flex
justify-between
items-center
"

>


<h2 className="
text-2xl
font-bold
">

Edit Transaction

</h2>



<button onClick={close}>

<X/>

</button>


</div>







<form

onSubmit={handleSubmit}

className="
mt-6
space-y-4
"

>



<input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Transaction title"

className="
w-full
bg-white/10
rounded-xl
px-4
py-3
outline-none
"

/>







<input

name="amount"

value={form.amount}

onChange={handleChange}

placeholder="Amount"

type="number"

className="
w-full
bg-white/10
rounded-xl
px-4
py-3
outline-none
"

/>







<select

name="type"

value={form.type}

onChange={handleChange}

className="
w-full
bg-white/10
rounded-xl
px-4
py-3
outline-none
"

>


<option value="income">
Income
</option>


<option value="expense">
Expense
</option>


</select>








<button

className="
w-full
bg-cyan-500
hover:bg-cyan-600
py-3
rounded-xl
font-semibold
"

>

Save Changes

</button>



</form>





</div>


</div>


);


};


export default EditTransactionModal;