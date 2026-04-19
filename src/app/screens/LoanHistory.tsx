import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { BottomNav } from "../components/BottomNav";
import { ArrowLeft, CreditCard, CheckCircle2, Clock, XCircle, AlertCircle, Calendar, Wallet, User } from "lucide-react";

interface Loan {
  id: string;
  amount: number;
  status: "active" | "completed" | "defaulted";
  date: string;
  dueDate: string;
  interest: number;
  daysRemaining?: number;
  progress?: number;
  extensionRequested?: boolean;
  lateFee?: number;
}

const loans: Loan[] = [
  {
    id: "1",
    amount: 50000,
    status: "active",
    date: "Feb 18, 2026",
    dueDate: "March 4, 2026",
    interest: 2500,
    daysRemaining: 14,
    progress: 60,
  },
  {
    id: "2",
    amount: 35000,
    status: "completed",
    date: "Jan 15, 2026",
    dueDate: "Feb 14, 2026",
    interest: 1750,
  },
  {
    id: "3",
    amount: 75000,
    status: "defaulted",
    date: "Dec 10, 2025",
    dueDate: "Jan 9, 2026",
    interest: 3750,
    lateFee: 2250,
  },
  {
    id: "4",
    amount: 25000,
    status: "completed",
    date: "Nov 5, 2025",
    dueDate: "Dec 5, 2025",
    interest: 1250,
  },
];

export function LoanHistory() {
  const navigate = useNavigate();

  const handleExtendLoan = (loanId: string) => {
    // Navigate to loan extension page
    navigate("/extend-loan", { state: { loanId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-24">
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
          <h1 className="text-2xl font-bold text-white">Loan History</h1>
        </div>

        <p className="text-blue-100 mb-6">Track all your loan activities</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-white border border-white/20">
            <p className="text-blue-200 text-xs mb-1">Total Loans</p>
            <p className="text-2xl font-bold">4</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-white border border-white/20">
            <p className="text-blue-200 text-xs mb-1">Completed</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-white border border-white/20">
            <p className="text-blue-200 text-xs mb-1">Credit Score</p>
            <p className="text-2xl font-bold">720</p>
          </div>
        </div>
      </div>

      {/* Loan List */}
      <div className="px-6 mt-6 space-y-4">
        {loans.map((loan) => (
          <div
            key={loan.id}
            className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    ₦{loan.amount.toLocaleString()}
                  </h3>
                  {loan.status === "active" && (
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-200">
                      Active
                    </span>
                  )}
                  {loan.status === "completed" && (
                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium border border-green-200">
                      Completed
                    </span>
                  )}
                  {loan.status === "defaulted" && (
                    <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium border border-red-200">
                      Defaulted
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">
                  Loan Date: {loan.date}
                </p>
                <p className="text-sm text-slate-600">
                  Due Date: {loan.dueDate}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-600 mb-1">Interest</p>
                <p className="text-lg font-bold text-yellow-600">
                  ₦{loan.interest.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Late Fee for Defaulted Loans */}
            {loan.status === "defaulted" && loan.lateFee && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="font-bold text-red-900">Late Payment Fee</p>
                </div>
                <p className="text-2xl font-bold text-red-700">
                  ₦{loan.lateFee.toLocaleString()}
                </p>
                <p className="text-sm text-red-600 mt-1">
                  Additional charges for overdue payment
                </p>
              </div>
            )}

            {/* Progress bar for active loans */}
            {loan.status === "active" && (
              <div className="mt-3">
                <div className="bg-slate-100 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full"
                    style={{ width: `${loan.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-600">
                    {loan.daysRemaining} days remaining
                  </p>
                  
                  {/* Loan Extension Button */}
                  <Button
                    onClick={() => handleExtendLoan(loan.id)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-8 px-4 text-xs rounded-xl"
                  >
                    Extend Loan
                  </Button>
                </div>
              </div>
            )}

            {/* Total Amount to Repay */}
            <div className="mt-4 pt-4 border-t-2 border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Total Repayment:</span>
                <span className="text-2xl font-bold text-slate-900">
                  ₦{((loan.amount + loan.interest + (loan.lateFee || 0))).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}