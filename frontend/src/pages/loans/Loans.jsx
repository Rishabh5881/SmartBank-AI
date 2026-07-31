import { useState } from "react";
import { motion } from "framer-motion";

import {
  Home,
  Car,
  GraduationCap,
  Wallet,
  Calculator,
  TrendingUp
} from "lucide-react";


import ApplyLoanModal from "../../components/loans/ApplyLoan";



const Loans = () => {



const loans = [


{
title:"Home Loan",
amount:"$250,000",
rate:"7.5%",
tenure:"20 Years",
icon:<Home/>,
color:"from-blue-600 to-cyan-400"
},



{
title:"Personal Loan",
amount:"$50,000",
rate:"10.5%",
tenure:"5 Years",
icon:<Wallet/>,
color:"from-purple-600 to-indigo-600"
},



{
title:"Car Loan",
amount:"$80,000",
rate:"8.2%",
tenure:"7 Years",
icon:<Car/>,
color:"from-green-500 to-emerald-600"
},



{
title:"Education Loan",
amount:"$100,000",
rate:"6.8%",
tenure:"10 Years",
icon:<GraduationCap/>,
color:"from-orange-500 to-red-500"
}



];







const [selectedLoan,setSelectedLoan] = useState(null);


const [showModal,setShowModal] = useState(false);








return (


<div

className="
min-h-screen
bg-slate-950
text-white
pt-28
px-6
lg:px-10
pb-10
"

>







{/* HEADER */}


<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

>


<h1 className="
text-4xl
font-bold
">

Smart Loans 🏦

</h1>



<p className="
text-gray-400
mt-2
">

Choose the best loan with AI powered recommendations

</p>



</motion.div>









{/* AI BANNER */}


<div className="
mt-10
rounded-3xl
p-8
border
border-white/10
bg-gradient-to-r
from-blue-600/30
to-cyan-500/20
flex
items-center
gap-5
">


<div className="
w-14
h-14
rounded-2xl
bg-cyan-500/20
flex
items-center
justify-center
">

<TrendingUp/>

</div>





<div>


<h2 className="
text-2xl
font-bold
">

AI Loan Recommendation

</h2>


<p className="
text-gray-300
mt-1
">

Based on your financial profile we found suitable offers.

</p>


</div>



</div>









{/* LOANS */}


<h2 className="
text-3xl
font-bold
mt-12
">

Available Loans

</h2>







<div className="
grid
md:grid-cols-2
xl:grid-cols-4
gap-6
mt-6
">


{

loans.map((loan,index)=>(


<motion.div


key={index}


whileHover={{
scale:1.05,
y:-5
}}


className={`
bg-gradient-to-br
${loan.color}
rounded-3xl
p-6
shadow-2xl
`}


>





<div className="
w-12
h-12
rounded-xl
bg-white/20
flex
items-center
justify-center
">

{loan.icon}

</div>






<h3 className="
text-2xl
font-bold
mt-6
">

{loan.title}

</h3>








<div className="
mt-5
space-y-3
">


<p>

Amount:

<span className="
font-bold
ml-2
">

{loan.amount}

</span>

</p>



<p>

Interest:

<span className="
font-bold
ml-2
">

{loan.rate}

</span>

</p>




<p>

Tenure:

<span className="
font-bold
ml-2
">

{loan.tenure}

</span>

</p>



</div>








<button


onClick={()=>{

setSelectedLoan(loan);

setShowModal(true);

}}



className="
mt-6
w-full
bg-white/20
hover:bg-white/30
py-3
rounded-xl
font-semibold
transition
"


>


Apply Now


</button>






</motion.div>


))


}




</div>









{/* EMI CALCULATOR */}



<div className="
mt-14
bg-white/10
border
border-white/10
rounded-3xl
p-8
">


<div className="
flex
items-center
gap-3
">

<Calculator/>

<h2 className="
text-2xl
font-bold
">

Loan EMI Calculator

</h2>


</div>






<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



<div>

<p className="
text-gray-400
">

Loan Amount

</p>


<h3 className="
text-3xl
font-bold
mt-2
">

$100,000

</h3>


</div>






<div>

<p className="
text-gray-400
">

Monthly EMI

</p>


<h3 className="
text-3xl
font-bold
text-cyan-400
mt-2
">

$1,250

</h3>


</div>







<div>

<p className="
text-gray-400
">

Total Interest

</p>


<h3 className="
text-3xl
font-bold
mt-2
">

$25,000

</h3>


</div>





</div>




</div>









{/* MODAL */}



<ApplyLoanModal


open={showModal}


close={()=>setShowModal(false)}


loan={selectedLoan}



/>









</div>


);


};



export default Loans;