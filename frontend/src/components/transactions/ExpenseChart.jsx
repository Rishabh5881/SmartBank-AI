import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";



const ExpenseChart = () => {


const data = [

{
name:"Shopping",
value:500
},

{
name:"Food",
value:300
},

{
name:"Bills",
value:250
},

{
name:"Entertainment",
value:150
}

];



const colors = [
"#06b6d4",
"#8b5cf6",
"#22c55e",
"#f97316"
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

Expense Analytics 📊

</h2>


<p className="
text-gray-400
mt-1
">

Your spending distribution

</p>




<div className="
h-[320px]
mt-6
">


<ResponsiveContainer

width="100%"

height="100%"

>


<PieChart>


<Pie

data={data}

dataKey="value"

outerRadius={110}

label

>


{

data.map((item,index)=>(


<Cell

key={index}

fill={colors[index]}

/>


))


}



</Pie>


<Tooltip />


</PieChart>


</ResponsiveContainer>


</div>



</div>


);


};


export default ExpenseChart;