import { useState } from "react";

import {
  Sparkles,
  CheckCircle,
  XCircle
} from "lucide-react";

import { motion } from "framer-motion";



const LoanEligibility = () => {


const [form,setForm] = useState({

income:"",
expense:"",
credit:""

});


const [result,setResult] = useState(null);





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const checkEligibility=(e)=>{


e.preventDefault();



const income =
Number(form.income);



const expense =
Number(form.expense);



const credit =
Number(form.credit);





const saving =
income-expense;





if(
credit >=700 &&
saving > 20000
)

{


setResult({

status:"Eligible",

amount:"$50,000",

message:
"Your financial profile looks strong"

});


}

else

{


setResult({

status:"Not Eligible",

amount:"",

message:
"Improve credit score or reduce expenses"

});


}



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

className="
mt-10
bg-white/10
border
border-white/10
rounded-3xl
p-6
"

>


<div className="
flex
items-center
gap-3
">


<Sparkles
className="text-cyan-400"
/>


<h2 className="
text-2xl
font-bold
">

AI Loan Eligibility Checker

</h2>


</div>





<form

onSubmit={checkEligibility}

className="
mt-6
grid
md:grid-cols-3
gap-5
"

>


<input

name="income"

value={form.income}

onChange={handleChange}

placeholder="Monthly Income"

className="
p-3
rounded-xl
bg-slate-900
border
border-white/10
"

/>





<input

name="expense"

value={form.expense}

onChange={handleChange}

placeholder="Monthly Expense"

className="
p-3
rounded-xl
bg-slate-900
border
border-white/10
"

/>






<input

name="credit"

value={form.credit}

onChange={handleChange}

placeholder="Credit Score"

className="
p-3
rounded-xl
bg-slate-900
border
border-white/10
"

/>






<button

className="
md:col-span-3
bg-gradient-to-r
from-blue-600
to-cyan-400
py-3
rounded-xl
font-semibold
"

>

Check Eligibility 🚀

</button>



</form>








{

result &&

<div className={`
mt-6
rounded-2xl
p-5

${
result.status==="Eligible"

?

"bg-green-500/20"

:

"bg-red-500/20"

}

`}>



<div className="
flex
items-center
gap-3
">


{

result.status==="Eligible"

?

<CheckCircle
className="text-green-400"
/>

:

<XCircle
className="text-red-400"
/>

}



<h3 className="
text-xl
font-bold
">

{result.status}

</h3>


</div>





<p className="
mt-3
text-gray-300
">

{result.message}

</p>



{

result.amount &&

<h2 className="
text-3xl
font-bold
mt-3
">

Maximum Loan: {result.amount}

</h2>

}



</div>


}



</motion.div>


);


};


export default LoanEligibility;