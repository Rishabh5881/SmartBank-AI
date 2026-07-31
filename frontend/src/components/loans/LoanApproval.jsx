import { useState } from "react";

import {
CheckCircle,
XCircle,
Clock
} from "lucide-react";

import { motion } from "framer-motion";



const LoanApproval = () => {



const [applications,setApplications] = useState([


{
id:1,
name:"Rishabh Sharma",
type:"Home Loan",
amount:"$100,000",
status:"Pending"
},


{
id:2,
name:"SmartBank User",
type:"Car Loan",
amount:"$25,000",
status:"Pending"
}


]);







const updateStatus=(id,status)=>{


setApplications((prev)=>

prev.map((loan)=>

loan.id===id

?

{
...loan,
status
}

:

loan

)

);


};








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


<h2 className="
text-2xl
font-bold
">

Loan Approval Panel 🏦

</h2>



<p className="
text-gray-400
mt-2
">

Admin review and approval workflow

</p>






<div className="
mt-6
space-y-4
">


{

applications.map((loan)=>(


<motion.div

key={loan.id}

whileHover={{
scale:1.02
}}

className="
bg-white/5
rounded-2xl
p-5
flex
justify-between
items-center
"

>


<div>


<h3 className="
font-bold
text-lg
">

{loan.type}

</h3>


<p className="
text-gray-400
">

Applicant: {loan.name}

</p>


<p className="
text-gray-300
">

Amount: {loan.amount}

</p>



</div>







<div className="
flex
items-center
gap-3
">


{

loan.status==="Pending"

&&

<>


<button

onClick={()=>updateStatus(
loan.id,
"Approved"
)}

className="
bg-green-500
px-4
py-2
rounded-xl
flex
gap-2
items-center
"

>

<CheckCircle size={18}/>

Approve

</button>





<button

onClick={()=>updateStatus(
loan.id,
"Rejected"
)}

className="
bg-red-500
px-4
py-2
rounded-xl
flex
gap-2
items-center
"

>

<XCircle size={18}/>

Reject

</button>


</>


}






{

loan.status==="Approved"

&&

<div className="
text-green-400
flex
gap-2
items-center
font-bold
">

<CheckCircle/>

Approved

</div>

}





{

loan.status==="Rejected"

&&

<div className="
text-red-400
flex
gap-2
items-center
font-bold
">

<XCircle/>

Rejected

</div>

}




</div>





</motion.div>


))


}



</div>





</div>


);


};


export default LoanApproval;