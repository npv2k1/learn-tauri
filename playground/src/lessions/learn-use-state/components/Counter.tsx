import React from 'react';

const Counter = () => {
  const [count, setCount] = React.useState<number>(0);
  console.log("Counter component render", count)
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-3">
      <h1 className="font-mono text-3xl text-gray-700">Count: {count}</h1>
      <button
        className="rounded-lg bg-blue-300 px-5 py-3 shadow-lg"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Click me
      </button>
    </div>
  );
};

export default Counter;
