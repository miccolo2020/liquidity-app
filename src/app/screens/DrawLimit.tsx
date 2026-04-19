import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Wallet, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

export function DrawLimit() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(50000);

  const loanAmounts = [10000, 25000, 50000, 100000, 200000, 500000];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleContinue = () => {
    localStorage.setItem("selectedLoanAmount", selectedAmount.toString());
    navigate("/profile-form");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100">
      {/* Header with curved design */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-b-[3rem] pb-12 pt-8 px-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-7 h-7 text-slate-900" />
          </div>
          <h1 className="text-2xl font-bold text-white">Liquidity</h1>
        </div>

        {/* Main illustration */}
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center border-4 border-yellow-400/30 relative">
            <TrendingUp className="w-16 h-16 text-yellow-400" />
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Your Loan Limit
          </h2>
          <p className="text-blue-100 text-lg">
            Choose how much you need today
          </p>
        </div>

        {/* Maximum Limit Badge */}
        <div className="bg-gradient-to-r from-yellow-400/20 to-amber-500/20 border-2 border-yellow-400/40 rounded-3xl p-4 text-center backdrop-blur-sm">
          <p className="text-yellow-300 text-sm mb-1">Maximum Available</p>
          <p className="text-4xl font-bold text-white">{formatCurrency(500000)}</p>
        </div>
      </div>

      {/* Loan Amount Selection */}
      <div className="px-6 py-8">
        <h3 className="text-slate-900 text-xl font-bold mb-4">Select Amount</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {loanAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedAmount(amount)}
              className={`relative p-6 rounded-3xl transition-all duration-300 ${
                selectedAmount === amount
                  ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-2xl scale-105"
                  : "bg-white border-2 border-slate-200 hover:border-yellow-400/50 shadow-lg"
              }`}
            >
              <div className={`text-2xl font-bold mb-1 ${
                selectedAmount === amount ? "text-slate-900" : "text-slate-900"
              }`}>
                ₦{(amount / 1000).toFixed(0)}k
              </div>
              <div className={`text-sm ${
                selectedAmount === amount ? "text-slate-700" : "text-slate-500"
              }`}>
                Loan Amount
              </div>
              {selectedAmount === amount && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-6 h-6 text-slate-900" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Selected Amount Display */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-yellow-400/30 shadow-xl">
          <p className="text-slate-600 text-sm mb-2">Selected Amount</p>
          <p className="text-5xl font-bold text-slate-900 mb-4">
            {formatCurrency(selectedAmount)}
          </p>
          <div className="flex items-center gap-2 text-yellow-600">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Fast approval in minutes</span>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl p-5 mb-6 space-y-3 border-2 border-slate-200 shadow-lg">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-slate-700">Quick disbursement to your account</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-slate-700">Flexible repayment terms</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-slate-700">Secure and confidential</p>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-3xl font-bold shadow-xl flex items-center justify-center gap-2"
        >
          Continue to Profile
          <ArrowRight className="w-6 h-6" />
        </Button>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-8 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-8 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-8 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}