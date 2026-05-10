"use client";

const error = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="font-bold text-2xl">Ooops! Something went wrong</h1>
        <p className="font-sm text-gray-600">Please try again later</p>
        <button
          className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    </section>
  );
};

export default error;
