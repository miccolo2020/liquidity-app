import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { BottomNav } from "../components/BottomNav";
import { 
  CreditCard, 
  Calculator, 
  History, 
  User, 
  Bell,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight
} from "lucide-react";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-32 rounded-b-[3rem] relative overflow-hidden shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-blue-200 mb-1">Good Morning,</p>
              <h1 className="text-2xl font-bold text-white">Chukwudi Okafor</h1>
            </div>
            <button 
              onClick={() => navigate("/notifications")}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center relative border border-white/20"
            >
              <Bell className="w-6 h-6 text-white" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-slate-900"></div>
            </button>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-2xl">
            <p className="text-slate-800 mb-2 font-medium">Available Balance</p>
            <h2 className="text-5xl font-bold text-slate-900 mb-1">₦125,000</h2>
            <p className="text-sm text-slate-800 font-medium">Credit Limit: ₦500,000</p>
            
            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => navigate("/apply-loan")}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-2xl font-bold"
              >
                Get Loan
              </Button>
              <Button
                onClick={() => navigate("/wallet")}
                className="flex-1 bg-white/90 hover:bg-white text-slate-900 h-12 rounded-2xl font-bold"
              >
                Repay Loan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-20 pb-24 relative z-10">
        {/* Active Loan Card */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-2 border-slate-200 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-600 mb-1">Active Loan</p>
              <h3 className="text-3xl font-bold text-slate-900">₦50,000</h3>
            </div>
            <div className="bg-amber-100 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-amber-200">
              <span className="text-amber-700 font-medium">14 days left</span>
            </div>
          </div>
          <div className="bg-slate-100 rounded-full h-3 mb-3">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-3 rounded-full shadow-lg" style={{ width: '60%' }}></div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-600">Due: March 4, 2026 • Interest: 5%</p>
            <button 
              onClick={() => navigate("/repayment")}
              className="text-yellow-600 font-medium text-sm hover:underline"
            >
              Pay Now
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => navigate("/apply-loan")}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-2xl flex items-center justify-center mb-2 border-2 border-yellow-400/30 shadow-lg">
                <CreditCard className="w-8 h-8 text-yellow-600" />
              </div>
              <span className="text-xs text-slate-700 text-center">Apply Loan</span>
            </button>

            <button
              onClick={() => navigate("/calculator")}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-2 border-2 border-blue-400/30 shadow-lg">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xs text-slate-700 text-center">Calculator</span>
            </button>

            <button
              onClick={() => navigate("/wallet")}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-2 border-2 border-purple-400/30 shadow-lg">
                <Wallet className="w-8 h-8 text-purple-600" />
              </div>
              <span className="text-xs text-slate-700 text-center">Wallet</span>
            </button>

            <button
              onClick={() => navigate("/history")}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl flex items-center justify-center mb-2 border-2 border-emerald-400/30 shadow-lg">
                <History className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="text-xs text-slate-700 text-center">History</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-3xl p-5 space-y-4 border-2 border-slate-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Loan Approved</p>
                <p className="text-sm text-slate-600">₦50,000 • Feb 18, 2026</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600 font-bold">+₦50,000</span>
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Repayment Due</p>
                <p className="text-sm text-slate-600">₦52,500 • March 4, 2026</p>
              </div>
              <span className="text-orange-600 font-medium text-sm px-3 py-1 bg-orange-100 rounded-full">Due</span>
            </div>

            <div className="border-t border-slate-200 pt-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Credit Limit Increased</p>
                <p className="text-sm text-slate-600">₦500,000 • Feb 10, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-3xl p-5 flex gap-3 shadow-lg">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-slate-900 mb-1">Complete Your KYC</p>
            <p className="text-sm text-slate-700 mb-3">Verify your identity to unlock higher loan limits and better rates.</p>
            <button
              onClick={() => navigate("/kyc")}
              className="text-yellow-600 font-bold text-sm hover:underline"
            >
              Verify Now →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}