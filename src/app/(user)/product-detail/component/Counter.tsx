import React from "react";

const Counter: React.FC<{
  count: number;
  increment: () => void;
  decrement: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ count, increment, decrement, handleInputChange }) => {
  return (
    <div className="bg-[#E5E5E5] gap-14 p-2 border flex justify-between items-center rounded-full border-[#dbd7d7]">
      <button
        className="bg-[#FFFFFF] text-[#000] flex justify-center items-center text-[20px] font-bold w-[38px] h-[38px] rounded-full"
        onClick={decrement}
      >
        -
      </button>
      <input
        type="number"
        value={count}
        onChange={handleInputChange}
        className="text-[14px] font-[700] text-[#09090B] rounded-full w-[60px] h-[30px] text-center"
      />
      <button
        className="bg-[#FFFFFF] text-[#000] flex justify-center items-center text-[20px] font-bold w-[38px] h-[38px] rounded-full"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
