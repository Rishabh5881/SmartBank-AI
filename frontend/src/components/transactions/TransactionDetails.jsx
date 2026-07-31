import {
  X,
  Trash2,
  Edit
} from "lucide-react";


const TransactionDetails = ({
  transaction,
  close,
  onDelete,
  onEdit
}) => {


  if(!transaction) return null;



  return (

    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/70
      flex
      items-center
      justify-center
      "
    >


      <div
        className="
        bg-slate-900
        border
        border-white/10
        rounded-3xl
        p-6
        w-[90%]
        max-w-md
        text-white
        "
      >


        <div className="
        flex
        justify-between
        items-center
        ">

          <h2 className="text-2xl font-bold">
            Transaction Details
          </h2>


          <button onClick={close}>
            <X/>
          </button>


        </div>





        <div className="mt-6 space-y-4">


          <div>
            <p className="text-gray-400">
              Title
            </p>

            <h3 className="text-xl font-semibold">
              {transaction.title}
            </h3>
          </div>





          <div>
            <p className="text-gray-400">
              Amount
            </p>

            <h3 className="text-2xl font-bold">
              {transaction.amount}
            </h3>
          </div>





          <div>
            <p className="text-gray-400">
              Type
            </p>

            <p className="capitalize">
              {transaction.type}
            </p>
          </div>




        </div>








        <div className="
        flex
        gap-3
        mt-8
        ">



          <button

          onClick={()=>onEdit(transaction)}

          className="
          flex-1
          bg-blue-500
          hover:bg-blue-600
          py-3
          rounded-xl
          flex
          justify-center
          items-center
          gap-2
          font-semibold
          "

          >

          <Edit size={18}/>

          Edit

          </button>







          <button

          onClick={()=>onDelete(transaction.id)}

          className="
          flex-1
          bg-red-500
          hover:bg-red-600
          py-3
          rounded-xl
          flex
          justify-center
          items-center
          gap-2
          font-semibold
          "

          >

          <Trash2 size={18}/>

          Delete

          </button>



        </div>





      </div>


    </div>


  );


};


export default TransactionDetails;