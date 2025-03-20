const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-12 animate-gradient">
      <div className="max-w-md text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-base-content/60 text-gray-800">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
