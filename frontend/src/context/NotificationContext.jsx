import { createContext, useContext, useState } from "react";


const NotificationContext = createContext();



const defaultNotifications = [

{
id:1,
icon:"CreditCard",
title:"Transaction Alert",
message:"Your payment of $250 was successful.",
time:"Today, 10:30 AM",
type:"Transaction",
read:false
},


{
id:2,
icon:"Bell",
title:"Loan Update",
message:"Your Home Loan EMI is due tomorrow.",
time:"Yesterday",
type:"Loan",
read:false
},


{
id:3,
icon:"ShieldCheck",
title:"Security Alert",
message:"New login detected from Chrome Windows.",
time:"Today, 09:45 AM",
type:"Security",
read:false
},


{
id:4,
icon:"Sparkles",
title:"AI Financial Tip",
message:"You can save $120/month by reducing unnecessary expenses.",
time:"Today",
type:"AI",
read:true
}

];





export const NotificationProvider = ({children})=>{


const [notifications,setNotifications] = useState(()=>{


const saved = localStorage.getItem(
"notifications"
);



return saved

?

JSON.parse(saved)

:

defaultNotifications;


});







const markAsRead = (id)=>{


const updatedNotifications = notifications.map((item)=>

item.id === id

?

{
...item,
read:true
}

:

item

);



setNotifications(updatedNotifications);



localStorage.setItem(

"notifications",

JSON.stringify(updatedNotifications)

);


};







const unreadCount = notifications.filter(

(item)=>!item.read

).length;





return (

<NotificationContext.Provider

value={{

notifications,

markAsRead,

unreadCount

}}

>


{children}


</NotificationContext.Provider>


);


};





export const useNotifications = ()=>{


return useContext(NotificationContext);


};