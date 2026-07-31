const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;