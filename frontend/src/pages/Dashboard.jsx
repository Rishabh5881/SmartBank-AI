import { 
  motion 
} from "framer-motion";


import {
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";


import {
  useState,
  useEffect
} from "react";


import axios from "axios";


import Navbar from "../components/layout/Navbar";


import BankCard from "../components/dashboard/BankCard";
import QuickActions from "../components/dashboard/QuickActions";
import SpendingChart from "../components/dashboard/SpendingChart";
import FinancialScore from "../components/dashboard/FinancialScore";
import LoanCalculator from "../components/dashboard/LoanCalculator";
import UpcomingPayments from "../components/dashboard/UpcomingPayments";
import AIRecommendation from "../components/dashboard/AIRecommendation";
import AccountStats from "../components/dashboard/AccountStats";
import AIAssistant from "../components/dashboard/AIAssistant";
import QuickActionModal from "../components/dashboard/QuickActionModal";



const Dashboard = () => {


const [modal,setModal] = useState(false);

const [action,setAction] = useState("");

const [user,setUser] = useState(null);


const [transactions,setTransactions] = useState([]);

const [transactionsLoading,setTransactionsLoading] = useState(true);

const [transactionsError,setTransactionsError] = useState(false);





// =======================
// LOAD USER
// =======================


useEffect(()=>{


const loadUser = ()=>{


const storedUser =
localStorage.getItem("user");



if(storedUser){

try{

setUser(
JSON.parse(storedUser)
);


}
catch{

setUser(null);

}


}

else{

setUser(null);

}


};



loadUser();



window.addEventListener(
"userUpdated",
loadUser
);



return ()=>{


window.removeEventListener(
"userUpdated",
loadUser
);


};



},[]);







// =======================
// USER NAME
// =======================


const userName =
user?.name ||
user?.fullName ||
"User";


const firstName =
userName.split(" ")[0];







// =======================
// QUICK ACTION
// =======================


const openModal=(name)=>{


setAction(name);

setModal(true);


};







// =======================
// TRANSACTIONS
// =======================


useEffect(()=>{


const fetchTransactions=async()=>{


try{


setTransactionsLoading(true);

setTransactionsError(false);



const token =
localStorage.getItem("token");



if(!token){

setTransactions([]);

return;

}





const response =
await axios.get(

"http://localhost:5000/api/v1/transactions",

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);





if(response.data?.success){


setTransactions(

response.data.data?.slice(0,5) || []

);


}

else{


setTransactions([]);

}



}

catch(error){


console.log(
"TRANSACTION ERROR",
error
);


setTransactionsError(true);

setTransactions([]);


}


finally{


setTransactionsLoading(false);


}



};



fetchTransactions();



},[]);








// =======================
// HELPERS
// =======================


const formatAmount=(transaction)=>{


const amount =
Number(transaction.amount || 0);



const type =
String(
transaction.type ||
transaction.transactionType ||
""
).toUpperCase();



const income =
type==="DEPOSIT" ||
type==="CREDIT" ||
type==="TRANSFER_IN";



return `${
income ? "+" : "-"
}$${Math.abs(amount).toLocaleString()}`;


};





const getTransactionType=(transaction)=>{


const type =
String(
transaction.type ||
transaction.transactionType ||
""
).toUpperCase();



if(
type==="DEPOSIT" ||
type==="CREDIT" ||
type==="TRANSFER_IN"
){

return "income";

}


return "expense";


};





const getTransactionTitle=(transaction)=>{


return (

transaction.description ||

transaction.title ||

transaction.type ||

"Transaction"

);


};





const getTransactionDate=(transaction)=>{


const date =
transaction.createdAt ||
transaction.date;



if(!date)
return "Recent";



return new Date(date)
.toLocaleDateString();


};





return (

<>
<Navbar />


<div
className="
relative
min-h-screen
overflow-hidden
bg-slate-950
text-white
"
>


<main
className="
relative
z-10
mx-auto
max-w-[1600px]
px-6
pb-16
pt-28
"
>


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
flex
justify-between
items-center
"

>


<div>


<p
className="
text-cyan-400
text-xs
uppercase
tracking-widest
"
>
Overview
</p>


<h1
className="
text-4xl
font-bold
mt-2
"
>

Welcome Back, {firstName} 👋

</h1>


<p
className="
text-slate-400
mt-2
"
>

SmartBank AI Financial Dashboard

</p>


</div>


<div
className="
rounded-full
border
border-white/10
px-4
py-2
text-green-400
"
>

● Account Active

</div>


</motion.div>
// =======================
// BANK CARD
// =======================

<section className="mt-10">

<BankCard />

</section>




// =======================
// ACCOUNT STATS
// =======================


<section className="mt-8">

<AccountStats />

</section>





// =======================
// QUICK ACTIONS
// =======================


<section className="mt-10">


<QuickActions
openModal={openModal}
/>


</section>





// =======================
// FINANCIAL OVERVIEW
// =======================


<section className="mt-14">


<h2
className="
text-3xl
font-bold
"
>

Financial Overview

</h2>



<div
className="
grid
gap-5
mt-6
md:grid-cols-3
"
>


<div
className="
rounded-3xl
bg-gradient-to-br
from-blue-600
to-cyan-500
p-6
"
>

<p>
Total Balance
</p>


<h3
className="
text-4xl
font-bold
mt-3
"
>

$24,580

</h3>


<span>
+12.5% Growth
</span>


</div>




<div
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
"
>

<p
className="text-slate-400"
>
Monthly Income
</p>


<h3
className="
text-3xl
font-bold
mt-3
"
>

$8,500

</h3>


</div>





<div
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
"
>

<p
className="text-slate-400"
>
Monthly Expense
</p>


<h3
className="
text-3xl
font-bold
mt-3
"
>

$2,300

</h3>


</div>



</div>


</section>





// =======================
// RECENT TRANSACTIONS
// =======================


<section className="mt-14">


<h2
className="
text-3xl
font-bold
"
>

Recent Activity

</h2>




<div
className="
mt-6
rounded-3xl
border
border-white/10
bg-white/5
p-6
"
>


{
transactionsLoading &&

<p className="text-slate-400">
Loading transactions...
</p>

}



{
!transactionsLoading &&
transactions.length===0 &&

<p className="text-slate-400">
No transactions found
</p>

}



{
transactions.map(
(item,index)=>(


<div
key={
item.id || index
}

className="
flex
justify-between
border-b
border-white/10
py-4
"
>


<div>


<h3
className="font-semibold"
>

{
getTransactionTitle(item)
}

</h3>


<p
className="
text-sm
text-slate-500
"
>

{
getTransactionDate(item)
}

</p>


</div>




<p
className={
getTransactionType(item)
==="income"

?

"text-green-400 font-bold"

:

"text-red-400 font-bold"

}
>

{
formatAmount(item)
}

</p>



</div>


)

)

}



</div>


</section>







// =======================
// ANALYTICS
// =======================


<section className="mt-14">


<h2
className="
text-3xl
font-bold
"
>

Analytics & Health

</h2>



<div
className="
grid
gap-6
mt-6
xl:grid-cols-2
"
>


<SpendingChart />


<FinancialScore />


</div>


</section>







// =======================
// BANKING SERVICES
// =======================


<section className="mt-14">


<h2
className="
text-3xl
font-bold
"
>

Banking Services

</h2>



<div
className="
grid
gap-6
mt-6
xl:grid-cols-2
"
>


<UpcomingPayments />


<LoanCalculator />


</div>


</section>






// =======================
// AI RECOMMENDATION
// =======================


<section className="mt-14">


<AIRecommendation />


</section>





</main>





<AIAssistant />





<QuickActionModal

open={modal}

close={()=>setModal(false)}

title={action}

/>




</div>


</>

);


};



export default Dashboard;