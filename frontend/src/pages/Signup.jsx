import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import axios from "axios";


const Signup = () => {

  const navigate = useNavigate();


  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");


  const [formData,setFormData] = useState({

    name:"",
    email:"",
    password:"",
    confirmPassword:"",

  });



  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value,

    });

    setError("");

  };




  const handleSignup = async(e)=>{

    e.preventDefault();


    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;



    if(
      !name ||
      !email ||
      !password ||
      !formData.confirmPassword
    ){

      setError("All fields are required");

      return;

    }



    if(password.length < 6){

      setError(
        "Password must be at least 6 characters"
      );

      return;

    }



    if(password !== formData.confirmPassword){

      setError(
        "Passwords do not match"
      );

      return;

    }




    try{


      setLoading(true);
      setError("");



      const response = await axios.post(

        "http://localhost:5000/api/auth/signup",

        {

          name,
          email,
          password,

        },

        {

          withCredentials:true,

        }

      );



      console.log(
        "Signup Success:",
        response.data
      );



      navigate("/login");



    }

    catch(err){


      console.log(
        "Signup Error:",
        err.response?.data
      );



      setError(

        err.response?.data?.message ||
        "Signup failed"

      );


    }


    finally{

      setLoading(false);

    }


  };






  return (

    <div
    className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-slate-950
    px-6
    "
    >



      <motion.div

      initial={{
        opacity:0,
        y:40
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.6
      }}

      className="
      w-full
      max-w-md
      rounded-3xl
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
      "

      >




      <div className="text-center">


        <div
        className="
        mx-auto
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-400
        text-3xl
        "
        >

        🛡️

        </div>




        <h1
        className="
        mt-5
        text-3xl
        font-bold
        text-white
        "
        >

        Create Account

        </h1>



        <p className="text-slate-400 mt-2">

        Start your SmartBank AI journey

        </p>


      </div>






      {
        error &&

        <div
        className="
        mt-5
        rounded-xl
        bg-red-500/10
        border
        border-red-500/20
        p-3
        text-sm
        text-red-400
        "
        >

        {error}

        </div>

      }







      <form
      onSubmit={handleSignup}
      className="
      mt-7
      space-y-5
      "
      >



      <Input

      icon={<User size={20}/>}

      name="name"

      placeholder="Full Name"

      value={formData.name}

      onChange={handleChange}

      />





      <Input

      icon={<Mail size={20}/>}

      name="email"

      type="email"

      placeholder="Email Address"

      value={formData.email}

      onChange={handleChange}

      />






      <Input

      icon={<Lock size={20}/>}

      name="password"

      type="password"

      placeholder="Password"

      value={formData.password}

      onChange={handleChange}

      />






      <Input

      icon={<Lock size={20}/>}

      name="confirmPassword"

      type="password"

      placeholder="Confirm Password"

      value={formData.confirmPassword}

      onChange={handleChange}

      />







      <button

      disabled={loading}

      className="
      flex
      w-full
      items-center
      justify-center
      gap-3
      rounded-xl
      bg-gradient-to-r
      from-blue-600
      to-cyan-400
      py-3.5
      font-semibold
      text-white
      disabled:opacity-60
      "

      >


      {

      loading

      ?

      "Creating Account..."

      :

      <>

      Create Account

      <ArrowRight size={20}/>

      </>

      }


      </button>




      </form>







      <p
      className="
      mt-7
      text-center
      text-sm
      text-slate-400
      "
      >

      Already have an account?


      <Link

      to="/login"

      className="
      ml-2
      text-cyan-400
      "

      >

      Login

      </Link>


      </p>





      </motion.div>


    </div>

  );


};







const Input = ({

icon,
name,
type="text",
placeholder,
value,
onChange

})=>{


return (

<div className="relative">


<div
className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"
>

{icon}

</div>



<input

required

type={type}

name={name}

value={value}

onChange={onChange}

placeholder={placeholder}

className="
w-full
rounded-xl
border
border-white/10
bg-slate-900
py-3.5
pl-12
pr-4
text-white
outline-none
focus:border-cyan-400
"

/>


</div>

);


};



export default Signup;