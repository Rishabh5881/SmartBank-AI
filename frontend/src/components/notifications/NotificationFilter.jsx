import { motion } from "framer-motion";

import {
  Bell,
  CreditCard,
  ShieldAlert,
  Wallet
} from "lucide-react";



const NotificationFilter = ({
  filter,
  setFilter
}) => {



const filters = [

{
id:"all",
label:"All",
icon:<Bell size={18}/>
},


{
id:"payment",
label:"Payments",
icon:<CreditCard size={18}/>
},


{
id:"security",
label:"Security",
icon:<ShieldAlert size={18}/>
},


{
id:"loan",
label:"Loans",
icon:<Wallet size={18}/>
}

];







return (


<div className="
flex
flex-wrap
gap-3
mt-6
">


{

filters.map((item)=>(


<motion.button

key={item.id}

whileHover={{
scale:1.05
}}

whileTap={{
scale:0.95
}}

onClick={()=>setFilter(item.id)}

className={`

flex
items-center
gap-2
px-5
py-3
rounded-xl
font-medium
transition-all


${
filter===item.id

?

"bg-cyan-500 text-white shadow-lg"

:

"bg-white/10 text-gray-300 hover:bg-white/20"

}

`}

>


{item.icon}

{item.label}


</motion.button>


))


}



</div>


);


};


export default NotificationFilter;