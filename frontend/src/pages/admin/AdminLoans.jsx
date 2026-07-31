import {
  useEffect,
  useState
} from "react";


import {
  getLoans,
  saveLoans
} from "../../utils/loanStorage";


import {
  getNotifications,
  saveNotifications
} from "../../utils/notificationStorage";





const AdminLoans = () => {



const [loans,setLoans] = useState([]);






useEffect(()=>{


setLoans(
getLoans()
);


},[]);








const updateStatus = (id,status)=>{



const updatedLoans = loans.map((loan)=>{


if(loan.id === id){


return {

...loan,

status

};


}


return loan;


});





setLoans(updatedLoans);


saveLoans(updatedLoans);







// Create Notification


const selectedLoan = 
loans.find(
(loan)=>loan.id === id
);




if(selectedLoan){



const notifications =
getNotifications();




const newNotification = {


id:Date.now(),


title:"Loan Application Update",


message:
`Your ${selectedLoan.type} has been ${status}`,


status,


date:
new Date().toLocaleDateString()


};




saveNotifications([

...notifications,

newNotification

]);



}



};









return (


<div

className="
min-h-screen
bg-slate-950
text-white
pt-28
px-6
lg:px-10
"

>



<h1

className="
text-4xl
font-bold
"

>

Admin Loan Approval Panel 🏦

</h1>



<p

className="
text-gray-400
mt-2
"

>

Review customer loan applications

</p>







<div

className="
mt-10
space-y-6
"

>




{

loans.length === 0 ?


<div

className="
bg-white/10
rounded-2xl
p-6
text-gray-400
"

>

No Loan Applications Found

</div>



:


loans.map((loan)=>(


<div

key={loan.id}

className="
bg-white/10
border
border-white/10
backdrop-blur-xl
rounded-3xl
p-6
"

>



<div

className="
flex
justify-between
items-center
"

>



<div>


<h2

className="
text-2xl
font-bold
"

>

{loan.type}

</h2>


<p className="
text-gray-400
mt-2
">

Application ID:
{loan.applicationId}

</p>


</div>





<span

className={`

px-4
py-2
rounded-full
text-sm
font-semibold


${

loan.status==="Approved"

?

"bg-green-500/20 text-green-400"

:

loan.status==="Rejected"

?

"bg-red-500/20 text-red-400"

:

"bg-yellow-500/20 text-yellow-400"

}


`}

>

{loan.status}

</span>




</div>









<div

className="
grid
md:grid-cols-3
gap-4
mt-6
"

>


<div

className="
bg-black/20
rounded-xl
p-4
"

>

<p className="text-gray-400">
Amount
</p>

<h3 className="text-xl font-bold">

{loan.amount}

</h3>

</div>






<div

className="
bg-black/20
rounded-xl
p-4
"

>

<p className="text-gray-400">
Tenure
</p>

<h3 className="text-xl font-bold">

{loan.tenure} Years

</h3>

</div>







<div

className="
bg-black/20
rounded-xl
p-4
"

>

<p className="text-gray-400">
Income
</p>

<h3 className="text-xl font-bold">

${loan.income}

</h3>

</div>




</div>










{

loan.status === "Pending" &&


<div

className="
flex
gap-4
mt-6
"

>


<button

onClick={()=>updateStatus(loan.id,"Approved")}

className="
bg-green-500
hover:bg-green-600
px-6
py-3
rounded-xl
font-semibold
"

>

Approve

</button>







<button

onClick={()=>updateStatus(loan.id,"Rejected")}

className="
bg-red-500
hover:bg-red-600
px-6
py-3
rounded-xl
font-semibold
"

>

Reject

</button>



</div>


}





</div>


))


}




</div>






</div>


);


};



export default AdminLoans;