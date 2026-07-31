import { useState } from "react";

import {
  Upload,
  CheckCircle,
  FileText
} from "lucide-react";

import { motion } from "framer-motion";



const LoanDocuments = () => {


const [documents,setDocuments] = useState([

{
name:"Identity Proof",
status:"Pending"
},

{
name:"Address Proof",
status:"Pending"
},

{
name:"Income Proof",
status:"Pending"
},

{
name:"Bank Statement",
status:"Pending"
}

]);






const uploadDocument=(index)=>{


setDocuments((prev)=>

prev.map((doc,i)=>

i===index

?

{
...doc,
status:"Verified"
}

:

doc

)

);


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


<h2 className="
text-2xl
font-bold
">

Loan Documents & KYC 📄

</h2>


<p className="
text-gray-400
mt-2
">

Upload required documents for loan approval

</p>






<div className="
mt-6
space-y-4
">


{

documents.map((doc,index)=>(


<div

key={index}

className="
flex
justify-between
items-center
bg-white/5
rounded-2xl
p-4
"

>


<div className="
flex
items-center
gap-3
">


<div className="
w-10
h-10
rounded-xl
bg-blue-500/20
flex
items-center
justify-center
text-blue-400
">

<FileText size={20}/>

</div>




<div>

<h3 className="
font-semibold
">

{doc.name}

</h3>


<p className="
text-sm
text-gray-400
">

{doc.status}

</p>


</div>


</div>







<button

onClick={()=>uploadDocument(index)}

className="
flex
items-center
gap-2
bg-cyan-500
px-4
py-2
rounded-xl
font-semibold
"

>


{
doc.status==="Verified"

?

<>

<CheckCircle size={18}/>

Verified

</>

:

<>

<Upload size={18}/>

Upload

</>

}



</button>



</div>


))


}



</div>




</motion.div>

);


};


export default LoanDocuments;