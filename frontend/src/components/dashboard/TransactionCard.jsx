import {
  ArrowDownRight,
  ShoppingCart,
  Receipt,
  Film,
  Utensils,
} from "lucide-react";


const transactions = [

  {
    id: 1,
    title: "Amazon Purchase",
    category: "Shopping",
    amount: -120,
    date: "Today",
  },

  {
    id: 2,
    title: "Salary Credit",
    category: "Income",
    amount: 3000,
    date: "Yesterday",
  },

  {
    id: 3,
    title: "Electricity Bill",
    category: "Bills",
    amount: -80,
    date: "2 days ago",
  },

  {
    id: 4,
    title: "Netflix Subscription",
    category: "Entertainment",
    amount: -15,
    date: "3 days ago",
  },

  {
    id: 5,
    title: "Restaurant",
    category: "Food",
    amount: -45,
    date: "4 days ago",
  },

];



const getIcon = (category) => {

  switch(category){

    case "Shopping":
      return <ShoppingCart size={20}/>;

    case "Income":
      return <ArrowDownRight size={20}/>;

    case "Bills":
      return <Receipt size={20}/>;

    case "Entertainment":
      return <Film size={20}/>;

    case "Food":
      return <Utensils size={20}/>;

    default:
      return <Receipt size={20}/>;

  }

};




const TransactionList = () => {


  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-xl
      p-6
      min-h-[420px]
      overflow-hidden
      "
    >


      {/* Header */}

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >

        <div>

          <h2
            className="
            text-xl
            font-bold
            text-slate-800
            "
          >

            Recent Transactions

          </h2>


          <p
            className="
            text-sm
            text-gray-500
            mt-1
            "
          >

            Latest activity

          </p>


        </div>



        <button
          className="
          text-blue-600
          font-semibold
          hover:text-blue-800
          "
        >

          View All

        </button>


      </div>







      {/* Transaction List */}


      <div
        className="
        space-y-4
        max-h-[320px]
        overflow-y-auto
        pr-2
        "
      >


        {
          transactions.map((item)=>(


            <div

              key={item.id}

              className="
              flex
              justify-between
              items-center
              gap-4
              p-4
              rounded-2xl
              hover:bg-slate-100
              transition
              duration-300
              cursor-pointer
              "

            >




              {/* Left Side */}


              <div
                className="
                flex
                items-center
                gap-4
                min-w-0
                "
              >



                <div

                  className={`
                  h-12
                  w-12
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0

                  ${
                    item.amount > 0

                    ? "bg-green-100 text-green-600"

                    : "bg-red-100 text-red-600"

                  }
                  `}

                >

                  {getIcon(item.category)}

                </div>






                <div className="min-w-0">


                  <h3

                    className="
                    font-semibold
                    text-slate-800
                    truncate
                    "

                  >

                    {item.title}

                  </h3>



                  <p
                    className="
                    text-sm
                    text-gray-500
                    "
                  >

                    {item.category}

                  </p>


                </div>



              </div>








              {/* Right Side */}


              <div
                className="
                text-right
                flex-shrink-0
                "
              >


                <h3

                  className={`
                  font-bold
                  text-lg

                  ${
                    item.amount > 0

                    ? "text-green-600"

                    : "text-red-500"

                  }
                  `}

                >


                  {
                    item.amount > 0

                    ? `+$${item.amount}`

                    : `-$${Math.abs(item.amount)}`
                  }


                </h3>




                <p
                  className="
                  text-sm
                  text-gray-400
                  "
                >

                  {item.date}

                </p>


              </div>



            </div>


          ))
        }


      </div>


    </div>


  );

};



export default TransactionList;