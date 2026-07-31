import { motion } from "framer-motion";

import {
  Bell,
  CheckCircle,
  AlertTriangle,
  CreditCard
} from "lucide-react";



const NotificationCard = ({
  title,
  message,
  time,
  type,
  read
}) => {



const icons = {

success:<CheckCircle size={24}/>,

warning:<AlertTriangle size={24}/>,

payment:<CreditCard size={24}/>

};





return (

<motion.div

whileHover={{
scale:1.02
}}

transition={{
duration:0.2
}}

className="
bg-white/10
border
border-white/10
rounded-2xl
p-5
flex
gap-4
backdrop-blur-xl
hover:border-cyan-400/40
transition
"

>


<div

className={`
w-12
h-12
rounded-xl
flex
items-center
justify-center

${
read
?
"bg-white/10 text-gray-300"
:
"bg-cyan-500/20 text-cyan-400"
}

`}

>


{
icons[type] || <Bell size={24}/>
}


</div>







<div className="flex-1">


<div

className="
flex
justify-between
items-start
gap-3
"

>


<h3

className="
font-semibold
text-lg
text-white
"

>

{title}

</h3>



{

!read &&

<span

className="
text-xs
bg-cyan-500
text-white
px-3
py-1
rounded-full
"

>

New

</span>

}



</div>







<p

className="
text-gray-400
mt-2
"

>

{message}

</p>







<p

className="
text-sm
text-gray-500
mt-3
"

>

{time}

</p>






</div>





</motion.div>


);


};


export default NotificationCard;