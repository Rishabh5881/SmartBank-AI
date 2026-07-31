require("dotenv").config();

const app = require("./app");
const prisma = require("./config/prisma");

const PORT = process.env.PORT || 5000;


// ==============================
// START SERVER
// ==============================

async function startServer() {

  try {

    await prisma.$connect();

    console.log(
      "PostgreSQL database connected successfully."
    );


  } catch(error) {

    console.error(
      "Warning: Could not connect to PostgreSQL at startup."
    );

    console.error(error.message);

  }



  const server = app.listen(PORT,()=>{

    console.log(
      `SmartBank AI server running on http://localhost:${PORT}`
    );


    console.log(
      `Health check: http://localhost:${PORT}/health`
    );

  });



  // ==============================
  // GRACEFUL SHUTDOWN
  // ==============================

  const shutdown = async(signal)=>{


    console.log(
      `\n${signal} received. Shutting down gracefully...`
    );


    server.close(async()=>{

      try{

        await prisma.$disconnect();


        console.log(
          "Server and database connection closed."
        );


        process.exit(0);


      }catch(error){


        console.error(
          "Error while disconnecting database:",
          error.message
        );


        process.exit(1);

      }

    });


  };



  process.on(
    "SIGINT",
    ()=>shutdown("SIGINT")
  );


  process.on(
    "SIGTERM",
    ()=>shutdown("SIGTERM")
  );

}


startServer();