import { useState } from "react";
import { OtpInput } from "./Input";

const otpLength = 6;

const App = () => {
  const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(""));
  console.log(otp.join(""));
  return (
    <main className="grid place-items-center w-screen h-screen">
      <OtpInput
        otpLength={otpLength}
        value={otp}
        onChange={(value) => setOtp(value)}
      />
    </main>
  );
};

export default App;
