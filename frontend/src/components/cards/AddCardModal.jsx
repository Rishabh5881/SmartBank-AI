import { useState } from "react";
import { X } from "lucide-react";


const AddCardModal = ({
open,
close,
createCard
}) => {


const [form,setForm] = useState({

type:"",
limit:"",
validity:"",
interest:""

});



if(!open) return null;




const submitCard=()=>{


if(
!form.type ||
!form.limit ||
!form.validity ||
!form.interest
)

return;



createCard(form);


setForm({

type:"",
limit:"",
validity:"",
interest:""

});


};






return (

<div className="
fixed
inset-0
bg-black/70
backdrop-blur-sm
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
max-w-md
text-white
">


<div className="
flex
justify-between
items-center
">

<h2 className="
text-2xl
font-bold
">

Add New Card 💳

</h2>


<button
onClick={close}
>

<X/>

</button>


</div>







<div className="
space-y-5
mt-6
">



{/* Card Type */}

<select

value={form.type}

onChange={(e)=>
setForm({
...form,
type:e.target.value
})
}

className="
w-full
bg-slate-800
p-3
rounded-xl
outline-none
"

>

<option value="">
Select Card Type
</option>


<option>
Platinum Card
</option>


<option>
Credit Card
</option>


<option>
Debit Card
</option>


</select>







{/* Limit */}


<select

value={form.limit}

onChange={(e)=>
setForm({
...form,
limit:e.target.value
})
}

className="
w-full
bg-slate-800
p-3
rounded-xl
outline-none
"

>


<option value="">
Select Limit
</option>


<option>
$50,000
</option>


<option>
$100,000
</option>


<option>
$500,000
</option>


</select>







{/* Validity */}


<select

value={form.validity}

onChange={(e)=>
setForm({
...form,
validity:e.target.value
})
}

className="
w-full
bg-slate-800
p-3
rounded-xl
outline-none
"

>


<option value="">
Select Validity
</option>


<option>
3 Years
</option>


<option>
5 Years
</option>


<option>
7 Years
</option>


</select>







{/* Interest */}


<select

value={form.interest}

onChange={(e)=>
setForm({
...form,
interest:e.target.value
})
}

className="
w-full
bg-slate-800
p-3
rounded-xl
outline-none
"

>


<option value="">
Select Interest Rate
</option>


<option>
12%
</option>


<option>
18%
</option>


<option>
24%
</option>


</select>







<button

onClick={submitCard}

className="
w-full
bg-cyan-500
hover:bg-cyan-600
py-3
rounded-xl
font-semibold
transition
"

>

Create Card

</button>





</div>





</div>


</div>


);


};


export default AddCardModal;