import { motion } from "framer-motion";

const TransactionFilter = ({
  filter,
  setFilter,
}) => {
  const filters = [
    {
      id: "all",
      label: "All",
      color: "bg-cyan-500",
    },
    {
      id: "income",
      label: "Income",
      color: "bg-green-500",
    },
    {
      id: "expense",
      label: "Expense",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {filters.map((item) => (
        <motion.button
          key={item.id}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setFilter(item.id)}
          className={`
            px-5
            py-2
            rounded-xl
            font-medium
            transition-all
            ${
              filter === item.id
                ? `${item.color} text-white shadow-lg`
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }
          `}
        >
          {item.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TransactionFilter;