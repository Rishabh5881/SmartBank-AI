import api from "./axios";



export const getProfile = async()=>{


const response = await api.get(
"/users/profile"
);


return response.data;


};





export const getAccounts = async()=>{


const response = await api.get(
"/accounts"
);


return response.data;


};





export const getTransactions = async()=>{


const response = await api.get(
"/transactions"
);


return response.data;


};