import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BrainCircuit,
  ShoppingBag,
  Coffee,
  CreditCard,
  Home,
} from "lucide-react";


const transactions = [
  {
    title: "Amazon Purchase",
    category: "Shopping",
    amount: "-$120.50",
    date: "Today, 10:30 AM",
    type: "expense",
    icon: ShoppingBag,
  },
  {
    title: "Salary Deposit",
    category: "Income",
    amount: "+$4,500",
    date: "Yesterday",
    type: "income",
    icon: ArrowDownLeft,
  },
  {
    title: "Netflix Subscription",
    category: "Entertainment",
    amount: "-$15.99",
    date: "24 July",
    type: "expense",
    icon: CreditCard,
  },
  {
    title: "Home Rent",
    category: "Housing",
    amount: "-$900",
    date: "20 July",
    type: "expense",
    icon: Home,
  },
  {
    title: "Coffee Shop",
    category: "Food",
    amount: "-$8.50",
    date: "18 July",
    type: "expense",
    icon: Coffee,
  },
];


const RecentTransaction = () => {


  return (

    <section className="relative overflow-hidden bg-slate-950 py-24">


      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />


      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">


        {/* Header */}


        <motion.div

          initial={{
            opacity:0,
            y:30
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="text-center"

        >

          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Transactions
          </p>


          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">

            Recent Financial Activity

          </h2>


          <p className="mx-auto mt-5 max-w-2xl text-slate-400">

            Monitor your latest transactions and receive
            AI-powered insights to manage your finances better.

          </p>


        </motion.div>





        <div className="mt-14 grid gap-8 lg:grid-cols-3">



          {/* Transaction List */}


          <div className="space-y-4 lg:col-span-2">


            {transactions.map((transaction,index)=>{


              const Icon = transaction.icon;


              return (

                <motion.div

                  key={index}

                  initial={{
                    opacity:0,
                    x:-30
                  }}

                  whileInView={{
                    opacity:1,
                    x:0
                  }}

                  viewport={{
                    once:true
                  }}

                  transition={{
                    delay:index*0.1
                  }}


                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-cyan-400/40"

                >


                  <div className="flex items-center gap-4">


                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400">

                      <Icon
                        size={22}
                        className="text-white"
                      />

                    </div>



                    <div>

                      <h3 className="font-semibold text-white">

                        {transaction.title}

                      </h3>


                      <p className="text-sm text-slate-400">

                        {transaction.category} • {transaction.date}

                      </p>


                    </div>


                  </div>




                  <div className="text-right">


                    <p
                      className={`font-bold ${
                        transaction.type === "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >

                      {transaction.amount}

                    </p>


                    <span className="text-xs text-slate-400">

                      Completed

                    </span>


                  </div>



                </motion.div>

              );


            })}


          </div>







          {/* AI Insight Card */}



          <motion.div

            initial={{
              opacity:0,
              scale:0.9
            }}

            whileInView={{
              opacity:1,
              scale:1
            }}

            viewport={{
              once:true
            }}


            className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 p-7 backdrop-blur-xl"

          >


            <div className="flex items-center gap-3">


              <div className="rounded-xl bg-cyan-400/20 p-3">

                <BrainCircuit
                  size={28}
                  className="text-cyan-400"
                />

              </div>


              <h3 className="text-xl font-bold text-white">

                AI Money Insight

              </h3>


            </div>





            <p className="mt-6 leading-relaxed text-slate-300">

              Your spending is 18% lower compared to last month.
              AI recommends saving an additional $300 this month.

            </p>




            <div className="mt-8 rounded-2xl bg-white/10 p-5">


              <div className="flex items-center justify-between">


                <span className="text-slate-300">

                  Monthly Saving

                </span>


                <ArrowUpRight
                  className="text-green-400"
                  size={20}
                />


              </div>


              <h2 className="mt-3 text-3xl font-bold text-white">

                +18%

              </h2>


            </div>



          </motion.div>



        </div>



      </div>


    </section>

  );
};


export default RecentTransaction;