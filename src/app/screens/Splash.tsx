import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Wallet } from "lucide-react";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/phone-verify");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="text-center relative z-10">
        {/* Logo Card */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 shadow-2xl border-2 border-yellow-400/30">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Wallet className="w-12 h-12 text-slate-900" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                Liquidity
              </h1>
            </div>
          </div>
        </div>

        <p className="text-yellow-400 text-xl font-bold mb-12 tracking-wide">Fast Loans, Easy Repayment</p>
        
        {/* Loading indicator */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}
