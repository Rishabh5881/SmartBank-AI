import { useState } from "react";
import { motion } from "framer-motion";


const LoanCalculator = () => {


const [amount,setAmount] = useState(100000);
const [rate,setRate] = useState(8);
const [years,setYears] = useState(5);


const calculateEMI = () => {


const monthlyRate = rate / 12 / 100;

const months = years * 12;


const emi =
(amount *
monthlyRate *
Math.pow(1 + monthlyRate, months))
/
(Math.pow(1 + monthlyRate, months)-1);


return emi || 0;

};


const emi = calculateEMI();


const totalPayment = emi * years * 12;

const totalInterest = totalPayment - amount;



return (

<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="
mt-10
bg-white/10
backdrop-blur-lg
border border-white/10
rounded-2xl
p-6
"


>


<h2 className="text-2xl font-bold">
Loan Calculator
</h2>


<div className="grid md:grid-cols-3 gap-5 mt-6">



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
rounded-lg
bg-slate-900
border
border-white/10
"

/>

</div>




<div>

<label className="text-gray-400">
Interest Rate (%)
</label>


<input

type="number"

value={rate}

onChange={(e)=>setRate(e.target.value)}

className="
w-full
mt-2
p-3
rounded-lg
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
rounded-lg
bg-slate-900
border
border-white/10
"

/>

</div>


</div>






<div className="grid md:grid-cols-3 gap-5 mt-8">



<div className="
bg-blue-600/20
p-5
rounded-xl
">

<p className="text-gray-300">
Monthly EMI
</p>

<h3 className="text-3xl font-bold mt-2">
${emi.toFixed(0)}
</h3>

</div>




<div className="
bg-green-600/20
p-5
rounded-xl
">

<p className="text-gray-300">
Total Payment
</p>

<h3 className="text-3xl font-bold mt-2">
${totalPayment.toFixed(0)}
</h3>

</div>




<div className="
bg-purple-600/20
p-5
rounded-xl
">

<p className="text-gray-300">
Total Interest
</p>

<h3 className="text-3xl font-bold mt-2">
${totalInterest.toFixed(0)}
</h3>

</div>



</div>



</motion.div>


)


}


export default LoanCalculator;