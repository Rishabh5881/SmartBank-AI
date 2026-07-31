import { useState } from "react";
import { motion } from "framer-motion";

import {
  CreditCard,
  Bell,
  ShieldCheck,
  Sparkles
} from "lucide-react";


const Notifications = () => {


  const [activeFilter, setActiveFilter] = useState("All");



  const [notifications, setNotifications] = useState([


    {
      id:1,
      icon:<CreditCard/>,
      title:"Transaction Alert",
      message:"Your payment of $250 was successful.",
      time:"Today, 10:30 AM",
      type:"Transaction",
      read:false
    },


    {
      id:2,
      icon:<Bell/>,
      title:"Loan Update",
      message:"Your Home Loan EMI is due tomorrow.",
      time:"Yesterday",
      type:"Loan",
      read:false
    },


    {
      id:3,
      icon:<ShieldCheck/>,
      title:"Security Alert",
      message:"New login detected from Chrome Windows.",
      time:"Today, 09:45 AM",
      type:"Security",
      read:false
    },


    {
      id:4,
      icon:<Sparkles/>,
      title:"AI Financial Tip",
      message:"You can save $120/month by reducing unnecessary expenses.",
      time:"Today",
      type:"AI",
      read:true
    }


  ]);





  const filters = [
    "All",
    "Transaction",
    "Loan",
    "Security",
    "AI"
  ];





  const markAsRead = (id)=>{


    setNotifications(

      notifications.map((item)=>

        item.id === id

        ?

        {
          ...item,
          read:true
        }

        :

        item

      )

    );


  };





  const filteredNotifications =


    activeFilter === "All"

    ?

    notifications

    :

    notifications.filter(

      (item)=>

      item.type === activeFilter

    );





  const unreadCount = notifications.filter(

    (item)=> !item.read

  ).length;





return (


<div className="
min-h-screen
bg-slate-950
text-white
p-8
">



{/* Header */}


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

Notifications 🔔

</h1>


<p className="
text-gray-400
mt-2
">

Stay updated with your banking activities

</p>



<div className="
mt-4
text-blue-400
">

Unread Notifications:
{unreadCount}

</div>



</motion.div>





{/* Filters */}


<div className="
flex
flex-wrap
gap-4
mt-8
">


{

filters.map((filter)=>(


<button

key={filter}

onClick={()=>setActiveFilter(filter)}


className={`
px-5
py-2
rounded-full
transition

${
activeFilter === filter

?

"bg-blue-600"

:

"bg-white/10"

}

`}

>


{filter}


</button>


))


}


</div>






{/* Notification List */}


<div className="
mt-10
space-y-5
">


{

filteredNotifications.map((item)=>(


<motion.div


key={item.id}


onClick={()=>markAsRead(item.id)}


whileHover={{
scale:1.02
}}


className={`

cursor-pointer

flex
items-center
gap-5

p-5

rounded-2xl

border
border-white/10


transition


${
item.read

?

"bg-white/5"

:

"bg-blue-600/20"

}


`}



>



<div className="
bg-blue-500/20
p-3
rounded-xl
">


{item.icon}


</div>





<div className="
flex-1
">


<h2 className="
text-xl
font-semibold
">

{item.title}

</h2>


<p className="
text-gray-300
mt-1
">

{item.message}

</p>



<p className="
text-sm
text-gray-500
mt-2
">

{item.time}

</p>



</div>





<span className="
px-3
py-1
rounded-full
bg-blue-600/20
text-blue-400
text-sm
">

{item.type}

</span>



</motion.div>


))


}



</div>



</div>


)


}


export default Notifications;