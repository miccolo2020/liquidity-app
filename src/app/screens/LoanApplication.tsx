import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, AlertCircle, CreditCard, Lock, Unlock, TrendingUp } from "lucide-react";

export function LoanApplication() {
  const navigate = useNavigate();
  
  // Mock user data - in real app, this would come from UserContext
  const [isFirstTimeBorrower, setIsFirstTimeBorrower] = useState(true);
  const [creditScore, setCreditScore] = useState(300);
  const [maxLoanAmount, setMaxLoanAmount] = useState(5000);
  const [maxLoanDuration, setMaxLoanDuration] = useState(7);
  const [userTier, setUserTier] = useState<string>("basic");

  const [formData, setFormData] = useState({
    amount: isFirstTimeBorrower ? "5000" : "",
    duration: isFirstTimeBorrower ? "7" : "",
    purpose: "",
    employmentStatus: "",
  });

  // Loan amount options with lock status
  const loanAmounts = [
    { value: "5000", label: "₦5,000", locked: false },
    { value: "10000", label: "₦10,000", locked: maxLoanAmount < 10000 },
    { value: "25000", label: "₦25,000", locked: maxLoanAmount < 25000 },
    { value: "50000", label: "₦50,000", locked: maxLoanAmount < 50000 },
    { value: "100000", label: "₦100,000", locked: maxLoanAmount < 100000 },
    { value: "150000", label: "₦150,000", locked: maxLoanAmount < 150000 },
    { value: "250000", label: "₦250,000", locked: maxLoanAmount < 250000 },
    { value: "500000", label: "₦500,000", locked: maxLoanAmount < 500000 },
  ];

  // Loan duration options with lock status
  const loanDurations = [
    { value: "7", label: "7 Days", locked: false },
    { value: "14", label: "14 Days", locked: maxLoanDuration < 14 },
    { value: "30", label: "30 Days", locked: maxLoanDuration < 30 },
    { value: "60", label: "60 Days", locked: maxLoanDuration < 60 },
    { value: "90", label: "90 Days", locked: maxLoanDuration < 90 },
    { value: "180", label: "180 Days", locked: maxLoanDuration < 180 },
  ];

  // Credit score to tier mapping
  const getTierInfo = (score: number) => {
    if (score < 400) return { tier: "Basic", color: "slate", limit: "₦5,000", duration: "7 days" };
    if (score < 550) return { tier: "Bronze", color: "yellow", limit: "₦50,000", duration: "30 days" };
    if (score < 650) return { tier: "Silver", color: "blue", limit: "₦150,000", duration: "60 days" };
    if (score < 750) return { tier: "Gold", color: "yellow", limit: "₦300,000", duration: "90 days" };
    return { tier: "Platinum", color: "purple", limit: "₦500,000", duration: "180 days" };
  };

  const tierInfo = getTierInfo(creditScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate first-time borrower restrictions
    if (isFirstTimeBorrower) {
      if (formData.amount !== "5000") {
        alert("First-time borrowers can only apply for ₦5,000. Complete this loan to unlock higher amounts!");
        return;
      }
      if (formData.duration !== "7") {
        alert("First-time borrowers can only apply for 7 days duration. Complete this loan to unlock longer durations!");
        return;
      }
    }

    // Check if amount exceeds limit
    if (parseInt(formData.amount) > maxLoanAmount) {
      alert(`Your current limit is ₦${maxLoanAmount.toLocaleString()}. Repay loans on time to increase your limit!`);
      return;
    }

    // Mock submission
    alert("Loan application submitted! You'll receive approval in 2 minutes.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <CreditCard className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Apply for Loan</h1>
        </div>

        {/* Credit Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 text-white border border-white/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-blue-200 text-sm mb-1">Your Credit Limit</p>
              <h2 className="text-3xl font-bold">₦{maxLoanAmount.toLocaleString()}</h2>
            </div>
            <div className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full border border-yellow-500">
              <p className="text-sm font-bold">{tierInfo.tier} Tier</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm bg-white/10 rounded-2xl p-3 border border-white/10">
            <TrendingUp className="w-4 h-4 text-yellow-400" />
            <span className="text-white">Credit Score: <span className="font-bold">{creditScore}</span> (CRC Credit Bureau)</span>
          </div>

          {isFirstTimeBorrower && (
            <div className="mt-3 bg-yellow-400/20 border border-yellow-400/30 rounded-2xl p-3">
              <p className="text-yellow-200 text-sm font-medium">
                🔒 First-time borrower: Start with ₦5,000 for 7 days. Unlock higher limits by repaying on time!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="px-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Loan Amount */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="amount" className="text-slate-700 font-bold flex items-center gap-2">
              Loan Amount
              {isFirstTimeBorrower && <span className="text-yellow-600 text-xs">(Fixed for first loan)</span>}
            </Label>
            
            <div className="grid grid-cols-2 gap-3">
              {loanAmounts.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    if (!option.locked) {
                      setFormData({ ...formData, amount: option.value });
                    }
                  }}
                  disabled={option.locked || (isFirstTimeBorrower && option.value !== "5000")}
                  className={`relative h-14 rounded-2xl border-2 font-bold text-lg transition-all ${
                    formData.amount === option.value
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-500 text-slate-900 shadow-lg"
                      : option.locked || (isFirstTimeBorrower && option.value !== "5000")
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white border-slate-300 text-slate-700 hover:border-yellow-400 hover:bg-yellow-50"
                  }`}
                >
                  {option.label}
                  {(option.locked || (isFirstTimeBorrower && option.value !== "5000")) && (
                    <Lock className="w-4 h-4 absolute top-2 right-2 text-slate-400" />
                  )}
                </button>
              ))}
            </div>

            {isFirstTimeBorrower ? (
              <p className="text-sm text-yellow-600 font-medium bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                ⚠️ First loan is fixed at ₦5,000. Complete it to unlock higher amounts!
              </p>
            ) : (
              <p className="text-sm text-slate-600">
                Your limit: ₦{maxLoanAmount.toLocaleString()} • Selected: ₦{formData.amount ? parseInt(formData.amount).toLocaleString() : "0"}
              </p>
            )}
          </div>

          {/* Loan Duration */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="duration" className="text-slate-700 font-bold flex items-center gap-2">
              Loan Duration
              {isFirstTimeBorrower && <span className="text-yellow-600 text-xs">(Fixed for first loan)</span>}
            </Label>
            
            <div className="grid grid-cols-3 gap-3">
              {loanDurations.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    if (!option.locked) {
                      setFormData({ ...formData, duration: option.value });
                    }
                  }}
                  disabled={option.locked || (isFirstTimeBorrower && option.value !== "7")}
                  className={`relative h-14 rounded-2xl border-2 font-bold text-base transition-all ${
                    formData.duration === option.value
                      ? "bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-500 text-slate-900 shadow-lg"
                      : option.locked || (isFirstTimeBorrower && option.value !== "7")
                      ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white border-slate-300 text-slate-700 hover:border-yellow-400 hover:bg-yellow-50"
                  }`}
                >
                  {option.label}
                  {(option.locked || (isFirstTimeBorrower && option.value !== "7")) && (
                    <Lock className="w-4 h-4 absolute top-2 right-2 text-slate-400" />
                  )}
                </button>
              ))}
            </div>

            {isFirstTimeBorrower ? (
              <p className="text-sm text-yellow-600 font-medium bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                ⚠️ First loan is fixed at 7 days. Complete it to unlock longer durations!
              </p>
            ) : (
              <p className="text-sm text-slate-600">
                Max duration: {maxLoanDuration} days • Selected: {formData.duration} days
              </p>
            )}
          </div>

          {/* Loan Purpose */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="purpose" className="text-slate-700 font-bold">Loan Purpose</Label>
            <Select
              value={formData.purpose}
              onValueChange={(value) => setFormData({ ...formData, purpose: value })}
            >
              <SelectTrigger className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl">
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Employment Status */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="employment" className="text-slate-700 font-bold">Employment Status</Label>
            <Select
              value={formData.employmentStatus}
              onValueChange={(value) => setFormData({ ...formData, employmentStatus: value })}
            >
              <SelectTrigger className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-Employed</SelectItem>
                <SelectItem value="business-owner">Business Owner</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loan Summary */}
          {formData.amount && formData.duration && (
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold mb-4 text-slate-900">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-800">Loan Amount</span>
                  <span className="font-bold text-slate-900">₦{parseInt(formData.amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-800">Interest (5%)</span>
                  <span className="font-bold text-slate-900">₦{(parseInt(formData.amount) * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-800">Duration</span>
                  <span className="font-bold text-slate-900">{formData.duration} Days</span>
                </div>
                <div className="border-t-2 border-slate-900/20 pt-3 flex justify-between">
                  <span className="text-slate-900">Total Repayment</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ₦{(parseInt(formData.amount) * 1.05).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Credit Bureau Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 mb-1">Credit Bureau Integration</p>
              <p className="text-sm text-blue-700">
                Your loan history is reported to CRC Credit Bureau Nigeria. Timely repayments improve your credit score and unlock higher limits!
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-3xl font-bold shadow-xl"
          >
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}
