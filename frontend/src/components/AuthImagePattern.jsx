const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-12 animate-gradient">
      <div className="max-w-md text-center relative z-10">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`relative aspect-[1.3] rounded-xl overflow-hidden ${
                i % 3 === 0
                  ? "bg-gradient-to-r from-teal-300 to-yellow-200"
                  : i % 2 === 0
                  ? "bg-gradient-to-tl from-indigo-200 to-pink-400"
                  : "bg-gradient-to-tr from-red-300 to-purple-400"
              }`}
            >
              {/* Inner shape with added layers for depth */}
              <div className="absolute inset-0 bg-opacity-50 rounded-xl shadow-lg"></div>
            </div>
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
