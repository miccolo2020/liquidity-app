import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { BottomNav } from "../components/BottomNav";
import { ArrowLeft, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, CreditCard, User, Copy } from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "credit",
    description: "Loan Disbursement",
    amount: 50000,
    date: "Feb 18, 2026",
    time: "10:30 AM",
  },
  {
    id: "2",
    type: "debit",
    description: "Loan Repayment",
    amount: 10000,
    date: "Feb 20, 2026",
    time: "2:15 PM",
  },
  {
    id: "3",
    type: "credit",
    description: "Refund",
    amount: 5000,
    date: "Feb 22, 2026",
    time: "11:45 AM",
  },
  {
    id: "4",
    type: "debit",
    description: "Processing Fee",
    amount: 500,
    date: "Feb 18, 2026",
    time: "10:31 AM",
  },
];

export function Wallet() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-24 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <WalletIcon className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">My Wallet</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-600 mb-2">Wallet Balance</p>
              <h2 className="text-4xl font-bold text-slate-900">₦125,000</h2>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-slate-900" />
            </div>
          </div>

          {/* Account Number */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-4 mb-4 border border-slate-200">
            <p className="text-slate-600 text-sm mb-2">Virtual Account Number</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-slate-900">7023456789</p>
              <button className="text-yellow-600">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-1">Liquidity Microfinance Bank</p>
          </div>

          <div className="flex gap-3 mb-6">
            <Button 
              onClick={() => navigate("/withdraw")}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-12 rounded-2xl font-bold shadow-lg"
            >
              Withdraw
            </Button>
            <Button 
              onClick={() => navigate("/repayment")}
              variant="outline" 
              className="flex-1 h-12 rounded-2xl border-2 border-slate-300 hover:bg-slate-50 font-bold"
            >
              Repay
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-6 -mt-12">
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Recent Transactions</h3>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === "credit"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowDownLeft className="w-6 h-6 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-red-600" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-slate-600">
                    {transaction.date} • {transaction.time}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}₦
                    {transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 text-yellow-600 font-medium text-sm hover:underline">
            View All Transactions
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <button 
            onClick={() => navigate("/send")}
            className="bg-white rounded-2xl p-4 text-center shadow-lg border-2 border-slate-200 hover:border-yellow-400 transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <ArrowUpRight className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-slate-900">Send</p>
          </button>

          <button 
            onClick={() => navigate("/receive")}
            className="bg-white rounded-2xl p-4 text-center shadow-lg border-2 border-slate-200 hover:border-yellow-400 transition-all"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <ArrowDownLeft className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-slate-900">Receive</p>
          </button>

          <button 
            onClick={() => navigate("/cards")}
            className="bg-white rounded-2xl p-4 text-center shadow-lg border-2 border-slate-200 hover:border-yellow-400 transition-all"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-slate-900">Cards</p>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}