import {
createContext,
useContext,
useEffect,
useState
} from "react";

import api from "../services/api";


const AuthContext=createContext();



export const AuthProvider=({children})=>{


const [user,setUser]=useState(null);

const [loading,setLoading]=useState(true);



const loadUser=async()=>{


try{


const token=localStorage.getItem("token");


if(token){


const res=await api.get("/auth/me");


setUser(res.data);


}



}
catch(error){

console.log(error);

localStorage.removeItem("token");

}
finally{

setLoading(false);

}


};




useEffect(()=>{

loadUser();

},[]);





const logout=()=>{

localStorage.removeItem("token");

localStorage.removeItem("user");

setUser(null);

};



return(

<AuthContext.Provider

value={{

user,

setUser,

logout,

loading

}}

>

{children}

</AuthContext.Provider>


);


};




export const useAuth=()=>useContext(AuthContext);