import {
  Brain,
  ShieldCheck,
  BarChart3,
  CreditCard
} from "lucide-react";


const features = [

{
icon:<Brain size={32}/>,
title:"AI Financial Assistant",
description:
"Get smart insights, personalized suggestions and better control over your money."
},


{
icon:<ShieldCheck size={32}/>,
title:"Advanced Security",
description:
"Secure transactions with intelligent fraud detection and protection."
},


{
icon:<BarChart3 size={32}/>,
title:"Smart Analytics",
description:
"Track spending patterns and understand your financial behavior."
},


{
icon:<CreditCard size={32}/>,
title:"Digital Banking",
description:
"Manage cards, payments and accounts from one powerful platform."
}

];




const Features = () => {


return (

<section
className="
py-24
text-white
"
>


<div
className="
max-w-[1280px]
mx-auto
"
>



<div
className="
text-center
"
>


<p
className="
text-cyan-400
font-medium
"
>
Powerful Features
</p>



<h2
className="
mt-4
text-4xl
md:text-5xl
font-bold
"
>

Everything You Need
For Smart Banking

</h2>



<p
className="
mt-5
text-slate-400
max-w-2xl
mx-auto
"
>

Experience next generation banking
with AI powered financial tools.

</p>


</div>





<div
className="
mt-14
grid
md:grid-cols-2
lg:grid-cols-4
gap-6
"
>


{
features.map((item,index)=>(


<div

key={index}

className="
rounded-3xl
border
border-white/10
bg-white/5
p-7
backdrop-blur-xl
hover:-translate-y-2
transition-all
duration-300
"

>


<div
className="
text-cyan-400
"
>

{item.icon}

</div>




<h3
className="
mt-6
text-xl
font-semibold
"
>

{item.title}

</h3>




<p
className="
mt-3
text-slate-400
text-sm
leading-6
"
>

{item.description}

</p>



</div>


))
}



</div>



</div>


</section>

)

}


export default Features;