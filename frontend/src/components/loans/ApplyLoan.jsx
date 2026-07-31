import { useState } from "react";
import { X } from "lucide-react";


const ApplyLoanModal = ({
open,
close,
loan
})=>{


const [form,setForm]=useState({

amount:"",
tenure:"",
purpose:"",
employment:""

});



if(!open) return null;



const submitLoan=()=>{


console.log({

loan,
...form

});


close();


};





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


<div className="
bg-slate-900
border
border-white/10
rounded-3xl
p-7
w-full
max-w-lg
text-white
">



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

Apply {loan?.title}

</h2>


<p className="
text-gray-400
text-sm
">

Fill loan details

</p>


</div>



<button
onClick={close}
>

<X/>

</button>


</div>







<div className="
space-y-4
mt-6
">


<input

placeholder="Loan Amount"

className="
w-full
bg-slate-800
p-3
rounded-xl
outline-none
"

onChange={(e)=>
setForm({
...form,
amount:e.target.value
})
}

/>





<select

className="
w-full
bg-slate-800
p-3
rounded-xl
"

onChange={(e)=>
setForm({
...form,
tenure:e.target.value
})
}

>

<option>
Select Tenure
</option>

<option>
5 Years
</option>

<option>
10 Years
</option>

<option>
20 Years
</option>


</select>







<input

placeholder="Loan Purpose"

className="
w-full
bg-slate-800
p-3
rounded-xl
"

onChange={(e)=>
setForm({
...form,
purpose:e.target.value
})
}

/>







<select

className="
w-full
bg-slate-800
p-3
rounded-xl
"

onChange={(e)=>
setForm({
...form,
employment:e.target.value
})
}

>


<option>
Employment Type
</option>


<option>
Salaried
</option>


<option>
Business
</option>


<option>
Student
</option>


</select>







<button

onClick={submitLoan}

className="
w-full
bg-cyan-500
hover:bg-cyan-600
py-3
rounded-xl
font-semibold
"

>

Submit Application

</button>





</div>






</div>


</div>


);


};


export default ApplyLoanModal;