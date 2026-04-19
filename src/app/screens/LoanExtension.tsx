import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft, Calendar, AlertCircle, CheckCircle2, CreditCard } from "lucide-react";

export function LoanExtension() {
  const navigate = useNavigate();
  const location = useLocation();
  const loanId = location.state?.loanId || "1";
  
  // Mock loan data - in real app, fetch from backend
  const [loan] = useState({
    id: loanId,
    amount: 50000,
    originalDueDate: "March 4, 2026",
    remainingAmount: 52500, // amount + interest
    daysRemaining: 14,
  });

  const [selectedExtension, setSelectedExtension] = useState<number | null>(null);

  const extensionOptions = [
    { days: 7, fee: loan.amount * 0.02, percentage: 2 },
    { days: 14, fee: loan.amount * 0.04, percentage: 4 },
    { days: 30, fee: loan.amount * 0.06, percentage: 6 },
  ];

  const handleExtend = () => {
    if (selectedExtension !== null) {
      const option = extensionOptions[selectedExtension];
      // Mock submission
      alert(
        `Loan extended by ${option.days} days!\n\nExtension fee: ₦${option.fee.toLocaleString()}\nNew due date: ${getNewDueDate(option.days)}\n\nThe fee will be added to your repayment amount.`
      );
      navigate("/history");
    }
  };

  const getNewDueDate = (extensionDays: number) => {
    const currentDue = new Date("2026-03-04");
    currentDue.setDate(currentDue.getDate() + extensionDays);
    return currentDue.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/history")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Calendar className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Extend Loan</h1>
        </div>

        <p className="text-blue-100 mb-6">Choose extension period for your loan</p>

        {/* Current Loan Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 text-white border border-white/20">
          <div className="flex justify-between items-center mb-3">
            <p className="text-blue-200 text-sm">Loan Amount</p>
            <p className="text-xl font-bold">₦{loan.amount.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center mb-3 pt-3 border-t border-white/20">
            <p className="text-blue-200 text-sm">Remaining to Pay</p>
            <p className="text-xl font-bold">₦{loan.remainingAmount.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/20">
            <p className="text-blue-200 text-sm">Current Due Date</p>
            <p className="text-lg font-bold">{loan.originalDueDate}</p>
          </div>
        </div>
      </div>

      {/* Extension Options */}
      <div className="px-6 mt-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Select Extension Period</h3>

        {extensionOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedExtension(index)}
            className={`w-full bg-white rounded-3xl p-6 border-2 shadow-lg transition-all ${
              selectedExtension === index
                ? "border-yellow-400 shadow-yellow-400/30"
                : "border-slate-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedExtension === index
                        ? "border-yellow-500 bg-yellow-400"
                        : "border-slate-300"
                    }`}
                  >
                    {selectedExtension === index && (
                      <CheckCircle2 className="w-4 h-4 text-slate-900" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {option.days} Days Extension
                  </h4>
                </div>

                <div className="space-y-2 ml-9">
                  <div className="flex justify-between items-center">
                    <p className="text-slate-600">Extension Fee ({option.percentage}%)</p>
                    <p className="font-bold text-slate-900">
                      ₦{option.fee.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-slate-600">New Due Date</p>
                    <p className="font-bold text-yellow-600">
                      {getNewDueDate(option.days)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <p className="text-slate-700">New Total Amount</p>
                    <p className="text-xl font-bold text-slate-900">
                      ₦{(loan.remainingAmount + option.fee).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* Important Notice */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 mt-6">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-blue-900 mb-2">Important Information</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Extension fee will be added to your total repayment</li>
                <li>• Your credit score will not be affected by extensions</li>
                <li>• You can only extend your loan once per cycle</li>
                <li>• The extension takes effect immediately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-3xl p-5">
          <div className="flex gap-3">
            <CheckCircle2 className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-yellow-900 mb-2">Extension Benefits</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Avoid late payment fees (1% per day)</li>
                <li>• Maintain good credit history</li>
                <li>• More time to arrange repayment</li>
                <li>• Instant approval - no verification needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6">
          <Button
            onClick={() => navigate("/history")}
            variant="outline"
            className="flex-1 h-14 text-lg rounded-2xl border-2 border-slate-300 font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleExtend}
            disabled={selectedExtension === null}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-2xl font-bold shadow-xl disabled:opacity-50"
          >
            Confirm Extension
          </Button>
        </div>

        {/* Contact Support */}
        <div className="text-center pt-4 pb-8">
          <p className="text-sm text-slate-600">
            Need help?{" "}
            <button className="text-yellow-600 font-medium hover:underline">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
