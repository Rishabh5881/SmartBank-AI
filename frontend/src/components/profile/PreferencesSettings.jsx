import {
  Bell,
  Mail,
  MessageSquare,
  Palette
} from "lucide-react";

import { useState } from "react";

import { motion } from "framer-motion";


const PreferencesSettings = () => {


const [emailAlert,setEmailAlert] = useState(true);

const [smsAlert,setSmsAlert] = useState(false);



return (

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
bg-white/10
border
border-white/10
rounded-2xl
p-6
"

>



<div className="
flex
items-center
gap-3
">


<Bell
size={30}
/>


<h2 className="
text-xl
font-semibold
">

Preferences

</h2>


</div>





{/* Email Alerts */}


<div className="
mt-6
flex
items-center
justify-between
bg-white/5
p-4
rounded-xl
">


<div className="
flex
gap-3
items-center
">


<Mail/>


<div>

<p>
Email Notifications
</p>

<p className="
text-gray-400
text-sm
">

Receive banking updates

</p>

</div>


</div>



<button

onClick={()=>setEmailAlert(!emailAlert)}

className={`

px-4
py-2
rounded-full

${
emailAlert

?

"bg-green-600"

:

"bg-gray-600"

}

`}

>

{emailAlert ? "ON":"OFF"}

</button>


</div>








{/* SMS Alerts */}


<div className="
mt-4
flex
items-center
justify-between
bg-white/5
p-4
rounded-xl
">


<div className="
flex
gap-3
items-center
">


<MessageSquare/>


<div>

<p>
SMS Alerts
</p>

<p className="
text-gray-400
text-sm
">

Transaction messages

</p>

</div>


</div>



<button

onClick={()=>setSmsAlert(!smsAlert)}

className={`

px-4
py-2
rounded-full

${
smsAlert

?

"bg-green-600"

:

"bg-gray-600"

}

`}

>

{smsAlert ? "ON":"OFF"}

</button>


</div>







{/* Theme */}


<div className="
mt-4
bg-white/5
p-4
rounded-xl
flex
items-center
gap-3
">


<Palette/>


<div>

<p>
Theme Settings
</p>


<p className="
text-gray-400
text-sm
">

Dark Mode Active

</p>


</div>


</div>



</motion.div>


)

}


export default PreferencesSettings;