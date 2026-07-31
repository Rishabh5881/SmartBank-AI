const Logo = () => {

  return (

    <div
      className="
      flex
      items-center
      gap-3
      cursor-pointer
      "
    >

      <div
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-blue-600
        to-cyan-400
        text-xl
        shadow-lg
        shadow-blue-500/30
        "
      >

        🛡

      </div>



      <div>

        <h1
          className="
          text-xl
          font-extrabold
          text-white
          "
        >

          SmartBank

          <span
            className="
            bg-gradient-to-r
            from-blue-500
            to-cyan-400
            bg-clip-text
            text-transparent
            "
          >

            AI

          </span>

        </h1>


      </div>


    </div>

  );

};


export default Logo;