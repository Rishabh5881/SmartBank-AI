import { Target, Plane, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const goals = [
  {
    title: "Emergency Fund",
    icon: ShieldCheck,
    saved: "$6,500",
    target: "$10,000",
    progress: 65,
  },
  {
    title: "Vacation Plan",
    icon: Plane,
    saved: "$2,250",
    target: "$5,000",
    progress: 45,
  },
  {
    title: "Investment Goal",
    icon: Target,
    saved: "$8,000",
    target: "$15,000",
    progress: 55,
  },
];

export default function FinancialGoals() {
  return (
    <div className="mt-10">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-slate-800">
          Financial Goals
        </h2>

        <button className="text-blue-600 font-medium">
          View All
        </button>
      </div>


      <div className="grid md:grid-cols-3 gap-5">

        {goals.map((goal,index)=>{

          const Icon = goal.icon;

          return (
            <motion.div
              key={index}
              whileHover={{ y:-5 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100"
            >

              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Icon size={24}/>
                </div>

                <h3 className="font-semibold text-slate-700">
                  {goal.title}
                </h3>

              </div>


              <div className="flex justify-between text-sm mb-3">
                <span className="text-slate-500">
                  Saved
                </span>

                <span className="font-semibold">
                  {goal.saved}
                </span>
              </div>


              <div className="w-full bg-slate-200 rounded-full h-2">

                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width:`${goal.progress}%`
                  }}
                />

              </div>


              <div className="flex justify-between mt-3 text-sm">

                <span className="text-slate-400">
                  Target {goal.target}
                </span>

                <span className="font-semibold text-blue-600">
                  {goal.progress}%
                </span>

              </div>


            </motion.div>
          )

        })}

      </div>

    </div>
  );
}