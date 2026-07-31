export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",

    secondary:
      "bg-cyan-500 hover:bg-cyan-600 text-white",

    outline:
      "border border-slate-700 bg-transparent text-white hover:bg-slate-800",

    ghost:
      "bg-transparent text-slate-300 hover:bg-slate-800",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-2xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        hover:-translate-y-0.5
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}