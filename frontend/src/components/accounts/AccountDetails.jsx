import { X, Edit, Trash2 } from "lucide-react";


const AccountDetails = ({
account,
close,
onDelete,
onEdit
}) => {


if(!account) return null;



return (

<div className="
fixed
inset-0
bg-black/60
backdrop-blur-sm
flex
items-center
justify-center
z-50
">


<div className="
bg-slate-900
border
border-white/10
rounded-3xl
p-6
w-[90%]
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

Account Details

</h2>


<button
onClick={close}
>

<X/>

</button>


</div>







<div className="
mt-6
space-y-4
">


<div>

<p className="text-gray-400">
Account Type
</p>

<h3 className="text-xl font-semibold">
{account.type}
</h3>

</div>






<div>

<p className="text-gray-400">
Account Number
</p>

<h3 className="
tracking-widest
font-semibold
">

{account.number}

</h3>

</div>







<div>

<p className="text-gray-400">
Balance
</p>


<h3 className="
text-3xl
font-bold
">

{account.balance}

</h3>


</div>



</div>








<div className="
flex
gap-4
mt-8
">


<button

onClick={()=>onEdit(account)}

className="
flex-1
bg-blue-600
py-3
rounded-xl
flex
items-center
justify-center
gap-2
"

>

<Edit size={18}/>

Edit

</button>






<button

onClick={()=>onDelete(account)}

className="
flex-1
bg-red-600
py-3
rounded-xl
flex
items-center
justify-center
gap-2
"

>

<Trash2 size={18}/>

Delete

</button>



</div>





</div>



</div>


);


};


export default AccountDetails;