import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Wallet, ShieldCheck, ArrowLeft } from "lucide-react";

export function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || "08012345678";
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && index === 3) {
      handleVerifyOTP(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = (otpCode?: string) => {
    const code = otpCode || otp.join("");
    if (code.length === 4) {
      // Mock OTP verification - in real app, verify with backend
      console.log("Verifying OTP:", code);
      // Navigate to loan limit page after successful verification
      setTimeout(() => {
        navigate("/draw-limit");
      }, 500);
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      // Mock resend OTP
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const maskPhoneNumber = (phone: string) => {
    if (phone.length >= 8) {
      return phone.slice(0, 3) + "****" + phone.slice(-4);
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-yellow-400/30 shadow-xl"
        >
          <ArrowLeft className="w-6 h-6 text-yellow-400" />
        </button>

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-4 shadow-xl border-2 border-yellow-400/30">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-slate-900" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                Liquidity
              </h1>
            </div>
          </div>
        </div>

        {/* OTP Verification Card */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 border-2 border-yellow-400/30">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl">
              <ShieldCheck className="w-10 h-10 text-slate-900" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Enter Verification Code
          </h2>
          <p className="text-slate-600 text-center mb-8">
            We sent a 4-digit code to <br />
            <span className="font-bold text-blue-900">+234 {maskPhoneNumber(phoneNumber)}</span>
          </p>

          {/* OTP Input Fields */}
          <div className="flex gap-2 justify-center mb-8">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-16 text-center text-2xl font-bold bg-white border-2 border-slate-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-slate-900 rounded-2xl shadow-lg"
              />
            ))}
          </div>

          {/* Resend Timer */}
          <div className="text-center mb-6">
            {canResend ? (
              <button
                onClick={handleResendOTP}
                className="text-yellow-600 font-bold hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-slate-600 text-sm">
                Resend code in{" "}
                <span className="font-bold text-yellow-600">{timer}s</span>
              </p>
            )}
          </div>

          <Button
            onClick={() => handleVerifyOTP()}
            disabled={otp.some((digit) => digit === "")}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-2xl font-bold shadow-xl disabled:opacity-50"
          >
            Verify & Continue
          </Button>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/phone-verify")}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium"
            >
              Change phone number?
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-yellow-400/30">
          <p className="text-yellow-400 text-sm text-center font-medium">
            🔒 Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}