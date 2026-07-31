import {

ResponsiveContainer,

LineChart,

Line,

XAxis,

YAxis,

Tooltip,

CartesianGrid

} from "recharts";



const BalanceChart = () => {



const data = [

{
month:"Jan",
balance:18000
},

{
month:"Feb",
balance:19500
},

{
month:"Mar",
balance:21000
},

{
month:"Apr",
balance:22500
},

{
month:"May",
balance:24000
},

{
month:"Jun",
balance:24580
}

];





return (


<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
mt-8
">


<h2 className="
text-2xl
font-bold
text-white
">

Balance Growth

</h2>


<p className="
text-gray-400
mt-1
">

Your account balance performance

</p>





<div className="
h-[320px]
mt-6
">


<ResponsiveContainer

width="100%"

height="100%"

>


<LineChart

data={data}

>


<CartesianGrid

strokeDasharray="3 3"

/>


<XAxis

dataKey="month"

stroke="white"

/>


<YAxis

stroke="white"

/>



<Tooltip

contentStyle={{

background:"#020617",

border:"1px solid rgba(255,255,255,0.1)"

}}

/>



<Line

type="monotone"

dataKey="balance"

strokeWidth={3}

stroke="#22d3ee"

/>



</LineChart>


</ResponsiveContainer>


</div>






</div>


);


};


export default BalanceChart;