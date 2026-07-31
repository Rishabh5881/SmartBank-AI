const transactions = [
  {
    name: "Netflix",
    category: "Entertainment",
    amount: "-$15.99",
    icon: "🎬"
  },
  {
    name: "Amazon",
    category: "Shopping",
    amount: "-$120.50",
    icon: "🛒"
  },
  {
    name: "Salary",
    category: "Income",
    amount: "+$3500",
    icon: "💰"
  },
  {
    name: "Starbucks",
    category: "Food",
    amount: "-$5.40",
    icon: "☕"
  }
];


export default function RecentTransactions(){

return(

<section className="mt-24">

<h2 className="text-3xl font-bold">
Recent Transactions
</h2>

<p className="mt-2 text-slate-400">
Track your latest financial activity
</p>


<div className="mt-8 grid gap-4 md:grid-cols-2">


{
transactions.map((item,index)=>(

<div
key={index}
className="
flex items-center justify-between
rounded-2xl
border border-white/10
bg-white/5
p-5
backdrop-blur-xl
hover:bg-white/10
transition
"
>


<div className="flex items-center gap-4">

<div className="text-3xl">
{item.icon}
</div>


<div>

<h3 className="font-semibold">
{item.name}
</h3>

<p className="text-sm text-slate-400">
{item.category}
</p>

</div>

</div>


<p
className={`font-bold ${
item.amount.startsWith("+")
? "text-green-400"
: "text-red-400"
}`}
>
{item.amount}
</p>


</div>


))
}


</div>

</section>

)

}
