import { useNavigate, useLocation } from "react-router";
import { CreditCard, Clock, Wallet, User } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-200 px-6 py-4 backdrop-blur-lg shadow-2xl z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isActive("/dashboard")
                ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg"
                : "bg-slate-100"
            }`}
          >
            <CreditCard
              className={`w-6 h-6 ${
                isActive("/dashboard") ? "text-slate-900" : "text-slate-400"
              }`}
            />
          </div>
          <span
            className={`text-xs font-medium ${
              isActive("/dashboard") ? "text-yellow-600" : "text-slate-400"
            }`}
          >
            Home
          </span>
        </button>

        {/* History */}
        <button
          onClick={() => navigate("/history")}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isActive("/history")
                ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg"
                : "bg-slate-100"
            }`}
          >
            <Clock
              className={`w-6 h-6 ${
                isActive("/history") ? "text-slate-900" : "text-slate-400"
              }`}
            />
          </div>
          <span
            className={`text-xs font-medium ${
              isActive("/history") ? "text-yellow-600" : "text-slate-400"
            }`}
          >
            History
          </span>
        </button>

        {/* Wallet */}
        <button
          onClick={() => navigate("/wallet")}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isActive("/wallet")
                ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg"
                : "bg-slate-100"
            }`}
          >
            <Wallet
              className={`w-6 h-6 ${
                isActive("/wallet") ? "text-slate-900" : "text-slate-400"
              }`}
            />
          </div>
          <span
            className={`text-xs font-medium ${
              isActive("/wallet") ? "text-yellow-600" : "text-slate-400"
            }`}
          >
            Wallet
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              isActive("/profile")
                ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg"
                : "bg-slate-100"
            }`}
          >
            <User
              className={`w-6 h-6 ${
                isActive("/profile") ? "text-slate-900" : "text-slate-400"
              }`}
            />
          </div>
          <span
            className={`text-xs font-medium ${
              isActive("/profile") ? "text-yellow-600" : "text-slate-400"
            }`}
          >
            Profile
          </span>
        </button>
      </div>
    </div>
  );
}
