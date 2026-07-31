import {
  ArrowDownLeft,
  ArrowUpRight
} from "lucide-react";


const Transactions = () => {


const transactions = [

{
name:"Amazon",
amount:"-$120",
type:"debit"
},

{
name:"Salary",
amount:"+$2500",
type:"credit"
},

{
name:"Netflix",
amount:"-$20",
type:"debit"
}

];



return (

<div

className="
space-y-3
"

>


{

transactions.map((item,index)=>(


<div

key={index}

className="
flex
items-center
justify-between
rounded-xl
bg-white/5
border
border-white/10
p-4
"

>


<div className="flex items-center gap-3">


<div

className={`
w-10
h-10
rounded-full
flex
items-center
justify-center

${
item.type==="credit"
?
"bg-green-500/20 text-green-400"
:
"bg-red-500/20 text-red-400"
}

`}

>


{

item.type==="credit"

?

<ArrowDownLeft size={18}/>

:

<ArrowUpRight size={18}/>

}


</div>



<p className="text-white font-medium">

{item.name}

</p>


</div>





<p

className={`
font-semibold

${
item.type==="credit"
?
"text-green-400"
:
"text-red-400"
}

`}

>

{item.amount}

</p>



</div>


))


}



</div>

);


};


export default Transactions;