export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#4845d2] text-white border-2 border-white rounded-lg px-6 py-6
                  hover:bg-[#3733b5] active:bg-[#2c2a99] transition-all focus:outline-none
                  ${className}`}
    >
      {children}
    </button>
  );
}
