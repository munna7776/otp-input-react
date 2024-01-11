import React, { KeyboardEvent, useRef, useState } from "react";

type Props = {
  otpLength: number;
  value: string[];
  onChange: (value: string[]) => void;
};

export const OtpInput = ({ otpLength, value: otpValue, onChange }: Props) => {
  const [activeInputIndex, setActiveInputIndex] = useState<number>(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const changeOtpValue = (code: string) => {
    const currentInputRef = inputRefs.current[activeInputIndex];
    if (!currentInputRef) {
      return;
    }
    const newOtp = [...otpValue];
    newOtp[activeInputIndex] = code;
    currentInputRef.value = code;
    onChange(newOtp);
  };

  const changeFocusToNextOrPrevInput = (index: number) => {
    const newActiveIndex = Math.max(Math.min(otpLength - 1, index), 0);
    if (inputRefs.current[newActiveIndex]) {
      inputRefs.current[newActiveIndex]?.focus();
      setActiveInputIndex(newActiveIndex);
    }
  };

  const handleKeyDownEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      changeFocusToNextOrPrevInput(activeInputIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      changeFocusToNextOrPrevInput(activeInputIndex + 1);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      changeOtpValue("");
      changeFocusToNextOrPrevInput(activeInputIndex - 1);
    } else if (e.key === "Delete") {
      e.preventDefault();
      changeOtpValue("");
    } else if (["Spacebar", "Space", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
    } else if (new RegExp("^([0-9])$").test(e.key)) {
      e.preventDefault();
      changeOtpValue(e.key);
      changeFocusToNextOrPrevInput(activeInputIndex + 1);
    }
  };

  return (
    <div
      role="group"
      aria-labelledby="one-time-password"
      className="flex gap-[0.8rem]"
    >
      {[...Array(otpLength)].map((_, index) => {
        return (
          <input
            key={index}
            type="number"
            inputMode="numeric"
            dir="ltr"
            maxLength={1}
            ref={(element) => (inputRefs.current[index] = element)}
            autoFocus={index === 0}
            onFocus={() => setActiveInputIndex(index)}
            onBlur={() =>
              setActiveInputIndex((prev) => (prev === 0 ? 0 : prev - 1))
            }
            onKeyDown={handleKeyDownEvent}
            data-value={otpValue[index]}
            aria-label={`Please enter otp character ${index + 1}`}
            className="border border-[#CDCDD659] focus:border-[#CDCDD6] w-[60px] h-[60px] text-center rounded-[10px] text-[1.7rem] font-almoni text-[#2A323F] bg-[#F5F6FA]"
          />
        );
      })}
    </div>
  );
};
