import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Wallet, Phone } from "lucide-react";

export function PhoneVerification() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      // Navigate to OTP verification with phone number
      navigate("/verify-otp", { state: { phoneNumber } });
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove non-numeric characters
    const cleaned = value.replace(/\D/g, "");
    // Limit to 11 digits
    return cleaned.substring(0, 11);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-2xl border-2 border-yellow-400/30">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Wallet className="w-8 h-8 text-slate-900" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                Liquidity
              </h1>
            </div>
          </div>
        </div>

        {/* Phone Verification Card */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-2xl p-8 border-2 border-yellow-400/30">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl">
              <Phone className="w-10 h-10 text-slate-900" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
            Verify Your Phone
          </h2>
          <p className="text-slate-600 text-center mb-8">
            Enter your phone number to receive a verification code
          </p>

          <form onSubmit={handleSendOTP} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 font-bold">Phone Number</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 font-bold text-lg">
                  +234
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="8012345678"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="h-16 text-lg pl-20 bg-white border-2 border-slate-300 text-slate-900 rounded-2xl focus:border-yellow-400 font-medium"
                  maxLength={11}
                  required
                />
              </div>
              <p className="text-sm text-slate-600">
                Enter your 11-digit Nigerian phone number
              </p>
            </div>

            <Button
              type="submit"
              disabled={phoneNumber.length < 10}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-2xl font-bold shadow-xl disabled:opacity-50"
            >
              Send OTP
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              By continuing, you agree to our{" "}
              <span className="text-yellow-600 font-bold">Terms of Service</span> and{" "}
              <span className="text-yellow-600 font-bold">Privacy Policy</span>
            </p>
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center">
          <p className="text-yellow-400 text-sm font-medium">
            🔒 Secure verification powered by Liquidity
          </p>
        </div>
      </div>
    </div>
  );
}
