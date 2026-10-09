const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <img
          src="/coombb-new.svg"
          alt="Loading"
          className="w-32 h-auto animate-pulse"
        />

        <div className="mt-6 w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />

        <p className="mt-4 text-sm font-medium text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
