import React from "react";
const CounterCart: React.FC<{
  count: number;
  increment: () => void;
  decrement: () => void;
}> = ({ count, increment, decrement }) => {
  return (
    <div className=" flex gap-3 items-center ">
      <button
        className="bg-[#E4E4E7] flex justify-center items-center  w-[32px] h-[32px] rounded-full"
        onClick={decrement}
      >
        -
      </button>
      <span className="bg-white flex justify-center items-center  w-[32px] h-[32px] rounded-full">
        {count}
      </span>
      <button
        className="bg-[#E4E4E7] flex justify-center items-center  w-[32px] h-[32px] rounded-full"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default CounterCart;
