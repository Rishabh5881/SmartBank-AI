export const getLoans = () => {

const loans =
localStorage.getItem("loans");


return loans
? JSON.parse(loans)
: [];

};



export const saveLoans = (loans)=>{

localStorage.setItem(
"loans",
JSON.stringify(loans)
);

};