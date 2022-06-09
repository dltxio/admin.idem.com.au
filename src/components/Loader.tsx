const Loader = () => {
  return (
    <div className="loader bg-white p-2 rounded-full flex justify-center space-x-3">
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse "></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
    </div>
  );
};
export default Loader;
