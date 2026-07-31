import { motion } from "framer-motion";

import {
  Bell,
  ShieldAlert,
  CreditCard,
  Mail
} from "lucide-react";



const NotificationStats = () => {



const stats = [


{
title:"Total Notifications",
value:"24",
desc:"All Alerts",
icon:<Bell size={24}/>
},



{
title:"Unread",
value:"05",
desc:"New Messages",
icon:<Mail size={24}/>
},



{
title:"Security Alerts",
value:"03",
desc:"Account Protection",
icon:<ShieldAlert size={24}/>
},



{
title:"Transaction Alerts",
value:"16",
desc:"Payment Updates",
icon:<CreditCard size={24}/>
}


];







return (

<div

className="
grid
md:grid-cols-2
xl:grid-cols-4
gap-5
mt-8
"

>


{

stats.map((item,index)=>(


<motion.div


key={index}


whileHover={{
scale:1.04
}}


transition={{
duration:0.2
}}


className="
bg-white/10
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
"


>



<div

className="
w-12
h-12
rounded-xl
bg-cyan-500/20
text-cyan-400
flex
items-center
justify-center
"

>

{item.icon}

</div>







<p

className="
text-gray-400
mt-5
"

>

{item.title}

</p>






<h2

className="
text-3xl
font-bold
mt-2
text-white
"

>

{item.value}

</h2>






<p

className="
text-sm
text-gray-400
mt-1
"

>

{item.desc}

</p>





</motion.div>


))


}



</div>


);


};


export default NotificationStats;