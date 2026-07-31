import { motion } from "framer-motion";


const EmiSchedule = () => {


const emiData = [
    {
        month:"August 2026",
        emi:"$1,850",
        principal:"$1,200",
        interest:"$650",
        status:"Paid"
    },
    {
        month:"September 2026",
        emi:"$1,850",
        principal:"$1,220",
        interest:"$630",
        status:"Upcoming"
    },
    {
        month:"October 2026",
        emi:"$1,850",
        principal:"$1,240",
        interest:"$610",
        status:"Upcoming"
    },
    {
        month:"November 2026",
        emi:"$1,850",
        principal:"$1,260",
        interest:"$590",
        status:"Upcoming"
    }
];


return (

<motion.div

initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}

className="
mt-10
bg-white/10
backdrop-blur-lg
border border-white/10
rounded-2xl
p-6
"

>


<h2 className="text-2xl font-bold mb-6">
EMI Schedule
</h2>



<div className="overflow-x-auto">


<table className="w-full text-left">


<thead>

<tr className="text-gray-400 border-b border-white/10">

<th className="p-3">
Month
</th>

<th className="p-3">
EMI
</th>

<th className="p-3">
Principal
</th>

<th className="p-3">
Interest
</th>

<th className="p-3">
Status
</th>


</tr>

</thead>



<tbody>


{
emiData.map((item,index)=>(


<tr 
key={index}
className="border-b border-white/10"
>


<td className="p-3">
{item.month}
</td>


<td className="p-3">
{item.emi}
</td>


<td className="p-3">
{item.principal}
</td>


<td className="p-3">
{item.interest}
</td>


<td className="p-3">


<span

className={`
px-3 py-1 rounded-full text-sm

${
item.status==="Paid"

?
"bg-green-500/20 text-green-400"

:
"bg-yellow-500/20 text-yellow-400"

}

`}

>

{item.status}

</span>


</td>


</tr>


))

}


</tbody>


</table>


</div>



</motion.div>

)

}


export default EmiSchedule;