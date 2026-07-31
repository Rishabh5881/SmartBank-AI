import { useState } from "react";

import {
  Calculator
} from "lucide-react";



const EMICalculator = () => {



const [amount,setAmount] = useState(500000);

const [rate,setRate] = useState(8);

const [years,setYears] = useState(5);





const calculateEMI = ()=>{


const monthlyRate =
rate / 12 / 100;


const months =
years * 12;



const emi =

amount *
monthlyRate *
Math.pow(
1 + monthlyRate,
months
)

/

(

Math.pow(
1 + monthlyRate,
months
)
-
1

);



return Math.round(emi);


};





const emi = calculateEMI();



const totalPayment =
emi * years * 12;



const interest =
totalPayment - amount;





return (

<div

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

<Calculator
className="text-cyan-400"
/>


<h2 className="
text-2xl
font-bold
">

EMI Calculator

</h2>


</div>







<div className="
grid
md:grid-cols-3
gap-5
mt-6
">



<div>


<label className="text-gray-400">
Loan Amount
</label>


<input

type="number"

value={amount}

onChange={(e)=>setAmount(e.target.value)}

className="
w-full
mt-2
p-3
rounded-xl
bg-slate-900
border
border-white/10
"

/>


</div>







<div>


<label className="text-gray-400">
Interest Rate %
</label>


<input

type="number"

value={rate}

onChange={(e)=>setRate(e.target.value)}

className="
w-full
mt-2
p-3
rounded-xl
bg-slate-900
border
border-white/10
"

/>


</div>








<div>


<label className="text-gray-400">
Tenure (Years)
</label>


<input

type="number"

value={years}

onChange={(e)=>setYears(e.target.value)}

className="
w-full
mt-2
p-3
rounded-xl
bg-slate-900
border
border-white/10
"

/>


</div>



</div>








<div className="
grid
md:grid-cols-3
gap-5
mt-8
">



<div className="
bg-cyan-500/20
rounded-2xl
p-5
">


<p>
Monthly EMI
</p>


<h2 className="
text-3xl
font-bold
mt-2
">

${emi}

</h2>


</div>








<div className="
bg-blue-500/20
rounded-2xl
p-5
">


<p>
Total Payment
</p>


<h2 className="
text-3xl
font-bold
mt-2
">

${totalPayment}

</h2>


</div>








<div className="
bg-purple-500/20
rounded-2xl
p-5
">


<p>
Total Interest
</p>


<h2 className="
text-3xl
font-bold
mt-2
">

${interest}

</h2>


</div>





</div>




</div>


);


};


export default EMICalculator;