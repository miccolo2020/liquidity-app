import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { ArrowLeft, Calculator, Info } from "lucide-react";

export function LoanCalculator() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(50000);
  const [duration, setDuration] = useState(30);

  const interestRate = 0.05; // 5%
  const extensionFeeRate = 0.02; // 2% per extension
  const lateFeeRate = 0.01; // 1% per day late
  
  const interest = amount * interestRate;
  const totalRepayment = amount + interest;
  const dailyRepayment = totalRepayment / duration;
  const extensionFee = amount * extensionFeeRate;
  const lateFeePerDay = amount * lateFeeRate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] border-b-2 border-slate-300 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Calculator className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Loan Calculator</h1>
        </div>

        <p className="text-blue-100">Calculate your loan repayment details</p>
      </div>

      {/* Calculator */}
      <div className="px-6 mt-6 space-y-6">
        {/* Amount Slider */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <div className="mb-6">
            <label className="text-slate-700 mb-2 block">Loan Amount</label>
            <div className="text-5xl font-bold text-slate-900 mb-6">
              ₦{amount.toLocaleString()}
            </div>
            <Slider
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
              min={5000}
              max={500000}
              step={5000}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-slate-600">
              <span>₦5,000</span>
              <span>₦500,000</span>
            </div>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <div className="mb-6">
            <label className="text-slate-700 mb-2 block">Loan Duration</label>
            <div className="text-5xl font-bold text-slate-900 mb-6">
              {duration} Days
            </div>
            <Slider
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              min={7}
              max={90}
              step={1}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-slate-600">
              <span>7 Days</span>
              <span>90 Days</span>
            </div>
          </div>
        </div>

        {/* Repayment Breakdown */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-xl mb-6 text-slate-900">Repayment Breakdown</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-900/20">
              <span className="text-slate-800">Principal Amount</span>
              <span className="text-xl font-bold text-slate-900">₦{amount.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-slate-900/20">
              <span className="text-slate-800">Interest (5%)</span>
              <span className="text-xl font-bold text-slate-900">₦{interest.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-slate-900/20">
              <span className="text-slate-800">Duration</span>
              <span className="text-xl font-bold text-slate-900">{duration} Days</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-slate-900/20">
              <span className="text-slate-800">Daily Repayment</span>
              <span className="text-xl font-bold text-slate-900">₦{Math.round(dailyRepayment).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg text-slate-900">Total Repayment</span>
              <span className="text-3xl font-bold text-slate-900">₦{Math.round(totalRepayment).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-lg text-slate-900">Fee Structure</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div>
                <p className="text-slate-900 font-medium">Extension Fee</p>
                <p className="text-slate-600 text-sm">Per extension request</p>
              </div>
              <span className="text-lg font-bold text-yellow-600">₦{extensionFee.toLocaleString()} (2%)</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div>
                <p className="text-slate-900 font-medium">Late Payment Fee</p>
                <p className="text-slate-600 text-sm">Per day after due date</p>
              </div>
              <span className="text-lg font-bold text-red-600">₦{lateFeePerDay.toLocaleString()} (1%/day)</span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-900 font-medium">Processing Fee</p>
                <p className="text-slate-600 text-sm">One-time charge</p>
              </div>
              <span className="text-lg font-bold text-green-600">₦0</span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <p className="text-slate-600 text-sm mb-1">Interest Rate</p>
            <p className="text-3xl font-bold text-yellow-600">5%</p>
          </div>
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <p className="text-slate-600 text-sm mb-1">Max Duration</p>
            <p className="text-3xl font-bold text-yellow-600">90 Days</p>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5">
          <p className="text-amber-800 text-sm">
            <span className="font-bold">⚠️ Important:</span> Pay on time to avoid late fees. Extension fees apply if you need to extend your loan duration.
          </p>
        </div>

        {/* Apply Button */}
        <Button
          onClick={() => navigate("/apply-loan")}
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-3xl font-bold shadow-xl"
        >
          Apply for This Loan
        </Button>
      </div>
    </div>
  );
}