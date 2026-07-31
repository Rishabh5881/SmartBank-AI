export const getNotifications = () => {

const data =
localStorage.getItem("notifications");


return data
? JSON.parse(data)
: [];

};



export const saveNotifications = (data)=>{

localStorage.setItem(
"notifications",
JSON.stringify(data)
);

};