import { useState } from "react";

import {
  CreditCard,
  TrendingUp,
  Plus
} from "lucide-react";

import { motion } from "framer-motion";


import BankCard from "../../components/cards/BankCard";
import CardDetails from "../../components/cards/CardDetails";
import AddCardModal from "../../components/cards/AddCardModal";



const Cards = () => {



const defaultCards = [

{
id:1,
type:"Platinum Card",
number:"4589 **** **** 7821",
holder:"SMARTBANK USER",
expiry:"12/28",
limit:"$100,000",
validity:"5 Years",
interest:"12%",
color:"from-blue-600 to-cyan-400",
frozen:false
},


{
id:2,
type:"Credit Card",
number:"5248 **** **** 9012",
holder:"SMARTBANK USER",
expiry:"08/29",
limit:"$50,000",
validity:"3 Years",
interest:"18%",
color:"from-purple-600 to-indigo-600",
frozen:false
},


{
id:3,
type:"Debit Card",
number:"7856 **** **** 3345",
holder:"SMARTBANK USER",
expiry:"04/30",
limit:"$25,000",
validity:"5 Years",
interest:"0%",
color:"from-emerald-500 to-green-600",
frozen:false
}

];





const [cards,setCards] = useState(defaultCards);


const [selectedCard,setSelectedCard] = useState(null);


const [showAddModal,setShowAddModal] = useState(false);








// CREATE CARD

const createCard = (data)=>{


const newCard = {


id:Date.now(),


type:data.type,


number:

Math.floor(
1000 + Math.random()*9000
)

+

" **** **** "

+

Math.floor(
1000 + Math.random()*9000
),



holder:"SMARTBANK USER",



expiry:


data.validity==="3 Years"

?

"12/28"

:

data.validity==="5 Years"

?

"12/30"

:

"12/32",





limit:data.limit,

validity:data.validity,

interest:data.interest,





color:


data.type==="Platinum Card"

?

"from-blue-600 to-cyan-400"


:


data.type==="Credit Card"

?

"from-purple-600 to-indigo-600"


:

"from-emerald-500 to-green-600",





frozen:false


};





setCards((prev)=>[

...prev,

newCard

]);



setShowAddModal(false);



};









// DELETE CARD


const deleteCard=(card)=>{


setCards((prev)=>

prev.filter(
(item)=>item.id!==card.id
)

);


setSelectedCard(null);


};










// FREEZE CARD


const freezeCard=(card)=>{


setCards((prev)=>

prev.map((item)=>

item.id===card.id

?

{
...item,
frozen:!item.frozen
}

:

item

)

);



setSelectedCard(null);


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
pb-10
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

>


<h1 className="
text-4xl
font-bold
">

My Cards 💳

</h1>


<p className="
text-gray-400
mt-2
">

Manage your debit and credit cards securely

</p>


</motion.div>









{/* Stats */}


<div className="
grid
md:grid-cols-3
gap-6
mt-10
">



<div className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
">

<div className="
flex
gap-3
items-center
">

<CreditCard/>

Total Cards

</div>


<h2 className="
text-4xl
font-bold
mt-4
">

{cards.length}

</h2>


</div>






<div className="
bg-green-500/20
rounded-3xl
p-6
">

<div className="
flex
gap-3
items-center
">

<TrendingUp/>

Available Limit

</div>


<h2 className="
text-4xl
font-bold
mt-4
">

$25,000

</h2>


</div>






<div className="
bg-cyan-500/20
rounded-3xl
p-6
">


<p>

Status

</p>


<h2 className="
text-4xl
font-bold
mt-4
text-green-400
">

Active

</h2>


</div>




</div>









{/* Header */}


<div className="
flex
justify-between
items-center
mt-12
">


<h2 className="
text-3xl
font-bold
">

Your Cards

</h2>



<button

onClick={()=>setShowAddModal(true)}

className="
flex
items-center
gap-2
bg-cyan-500
px-5
py-3
rounded-xl
font-semibold
"

>

<Plus/>

Add Card

</button>



</div>









{/* Cards */}



<div className="
grid
lg:grid-cols-3
md:grid-cols-2
gap-6
mt-6
">


{

cards.map((card)=>(


<BankCard

key={card.id}

{...card}

onClick={()=>setSelectedCard(card)}

/>


))


}



</div>









<CardDetails

card={selectedCard}

close={()=>setSelectedCard(null)}

onDelete={deleteCard}

onFreeze={freezeCard}

/>







<AddCardModal

open={showAddModal}

close={()=>setShowAddModal(false)}

createCard={createCard}

/>







</div>


);


};


export default Cards;