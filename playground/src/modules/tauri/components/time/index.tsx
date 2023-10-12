import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [current, setCurrent] = useState('');
  console.log("🚀 ~ file: index.tsx:5 ~ Timer ~ current:", current)

  useEffect(() => {
    let t = setInterval(() => {
      setCurrent(new Date().toLocaleString());
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <div className="text-center">
      <h1>{current}</h1>
    </div>
  );
};

export default Timer;
