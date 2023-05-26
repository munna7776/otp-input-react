import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

const otpLength = 6;

const App = () => {

  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""))
  const [activeInputIndex,setActveInputIndex] = useState<number>(0)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if(value.trim().length === 1) {
      const newOtp = [...otp]
      newOtp[activeInputIndex] = value
      setOtp(newOtp)
      changeFocusToNextOrPrevInput(activeInputIndex+1)
    }
  }

  const changeFocusToNextOrPrevInput = (index: number) => {
    if(index < otpLength) {
      inputRefs.current[index]?.focus()
      setActveInputIndex(index)
    }
  }

  const handleKeyDownEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    const newOtp = [...otp]
    if(e.key === "ArrowLeft") {
      changeFocusToNextOrPrevInput(activeInputIndex-1)
    } else if(e.key === "ArrowRight") {
      changeFocusToNextOrPrevInput(activeInputIndex+1)
    } else if(e.key === "Backspace") {
      newOtp[activeInputIndex] = ''
      setOtp(newOtp)
      changeFocusToNextOrPrevInput(activeInputIndex-1)
    } else if(e.key === "Delete") {
      newOtp[activeInputIndex] = ''
      setOtp(newOtp)
      changeFocusToNextOrPrevInput(activeInputIndex-1)
    } else {
      return ;
    }
  }
  console.log(otp.join(""))
  return (
    <main className="grid place-items-center w-screen h-screen">
      <div className="flex gap-2"  >
        {
          [...Array(6)].map((_,index) => {
            return (
              <input  
                key={index} 
                type="text"
                maxLength={1} 
                ref={(element) => inputRefs.current[index] = element}
                data-testid={`input-${index}`}
                value={otp[index]}
                onChange={handleChange}
                autoFocus={index===0}
                onKeyDown={handleKeyDownEvent}
                className="focus:outline-none border-2 border-[#C7D0D6] focus:border-[#A1A9B0] h-[44px] w-[44px] text-center rounded text-lg text-[#A1A9B0]" 
              />
            )
          })
        }
      </div>
    </main>
  )
}

export default App

