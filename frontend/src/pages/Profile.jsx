import {
  LogOut,
  User,
  Mail,
  Phone,
  ShieldCheck
} from "lucide-react";


const Profile = () => {


  const storedUser =
    localStorage.getItem("user");


  let user = null;


  try {

    user = storedUser
      ? JSON.parse(storedUser)
      : null;

  } catch (error) {

    console.log(
      "PROFILE USER ERROR:",
      error
    );

  }


  /*
  =========================
  USER DATA
  =========================
  */

  const userName =
    user?.name ||
    user?.fullName ||
    "User";


  const userEmail =
    user?.email ||
    "No email";


  const userRole =
    user?.role ||
    "CUSTOMER";


  const avatar =
    userName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();





  /*
  =========================
  LOGOUT
  =========================
  */

  const logout = () => {


    localStorage.removeItem(
      "user"
    );


    localStorage.removeItem(
      "token"
    );


    window.dispatchEvent(
      new Event("userUpdated")
    );


    window.location.href = "/";

  };





  return (

    <div

      className="
        min-h-screen
        bg-slate-950
        text-white
        pt-28
        px-6
        lg:px-10
        pb-10
      "

    >



      <div

        className="
          max-w-4xl
          mx-auto
        "

      >



        <div

          className="
            bg-white/10
            border
            border-white/10
            rounded-3xl
            p-8
            backdrop-blur-xl
          "

        >



          {/* PROFILE HEADER */}

          <div

            className="
              flex
              items-center
              gap-6
            "

          >



            <div

              className="
                w-24
                h-24
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-400
                flex
                items-center
                justify-center
                text-3xl
                font-bold
              "

            >

              {avatar}

            </div>





            <div>


              <h1

                className="
                  text-3xl
                  font-bold
                "

              >

                {userName}

              </h1>



              <p

                className="
                  text-gray-400
                "

              >

                {userRole}

              </p>





              <div

                className="
                  flex
                  items-center
                  gap-2
                  mt-3
                  text-green-400
                "

              >

                <ShieldCheck
                  size={18}
                />

                Verified User

              </div>



            </div>


          </div>







          {/* USER INFORMATION */}

          <div

            className="
              grid
              md:grid-cols-2
              gap-5
              mt-10
            "

          >





            {/* NAME */}

            <div

              className="
                bg-white/5
                rounded-2xl
                p-5
                flex
                gap-4
                items-center
              "

            >

              <User
                className="text-cyan-400"
              />


              <div>

                <p

                  className="
                    text-gray-400
                  "

                >

                  Name

                </p>


                <h3>

                  {userName}

                </h3>


              </div>


            </div>







            {/* EMAIL */}

            <div

              className="
                bg-white/5
                rounded-2xl
                p-5
                flex
                gap-4
                items-center
              "

            >

              <Mail
                className="text-cyan-400"
              />


              <div>

                <p

                  className="
                    text-gray-400
                  "

                >

                  Email

                </p>


                <h3>

                  {userEmail}

                </h3>


              </div>


            </div>







            {/* PHONE */}

            <div

              className="
                bg-white/5
                rounded-2xl
                p-5
                flex
                gap-4
                items-center
              "

            >

              <Phone
                className="text-cyan-400"
              />


              <div>

                <p

                  className="
                    text-gray-400
                  "

                >

                  Phone

                </p>


                <h3>

                  +91 XXXXX XXXXX

                </h3>


              </div>


            </div>



          </div>







          {/* LOGOUT */}

          <button

            onClick={logout}

            className="
              mt-10
              w-full
              bg-red-500
              hover:bg-red-600
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition
            "

          >

            <LogOut
              size={18}
            />

            Logout

          </button>





        </div>


      </div>


    </div>

  );


};


export default Profile;