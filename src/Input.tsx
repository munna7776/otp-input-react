import React, { useRef } from "react";

type InputProps = {
  index: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeInputIndex: number;
};

const Input = ({ handleChange, index, activeInputIndex }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <input
      type="number"
      maxLength={1}
      min={0}
      max={9}
      ref={inputRef}
      data-testid={`input-${index}`}
    //   disabled={index > activeInputIndex}
      onChange={handleChange}
      autoFocus={index === 0}
      className="focus:outline-none border-2 border-[#C7D0D6] focus:border-[#A1A9B0] h-[44px] w-[44px] text-center rounded text-lg text-[#A1A9B0]"
    />
  );
};

export default Input;
