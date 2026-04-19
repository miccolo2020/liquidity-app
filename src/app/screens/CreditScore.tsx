import { useNavigate } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { 
  ArrowLeft, 
  TrendingUp, 
  Shield, 
  CheckCircle2,
  AlertCircle,
  Award,
  Clock,
  CreditCard,
  Info
} from "lucide-react";

export function CreditScore() {
  const navigate = useNavigate();

  // Mock credit bureau data
  const creditData = {
    score: 720,
    tier: "Silver",
    reportDate: "February 26, 2026",
    nextUpdate: "March 26, 2026",
    bureau: "CRC Credit Bureau Nigeria",
    factors: [
      { name: "Payment History", score: 85, impact: "High", color: "green" },
      { name: "Credit Utilization", score: 70, impact: "High", color: "yellow" },
      { name: "Credit Age", score: 60, impact: "Medium", color: "yellow" },
      { name: "Account Mix", score: 75, impact: "Low", color: "green" },
      { name: "Recent Inquiries", score: 90, impact: "Low", color: "green" },
    ],
    history: [
      { month: "Jan 2026", score: 680 },
      { month: "Dec 2025", score: 650 },
      { month: "Nov 2025", score: 620 },
      { month: "Oct 2025", score: 580 },
      { month: "Sep 2025", score: 550 },
      { month: "Aug 2025", score: 520 },
    ],
    recommendations: [
      "Keep making timely payments to improve your score",
      "Reduce your credit utilization below 30%",
      "Avoid applying for multiple loans in a short period",
      "Complete KYC verification for better rates",
    ],
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return { bg: "purple", text: "Excellent" };
    if (score >= 650) return { bg: "blue", text: "Very Good" };
    if (score >= 550) return { bg: "green", text: "Good" };
    if (score >= 400) return { bg: "yellow", text: "Fair" };
    return { bg: "red", text: "Poor" };
  };

  const scoreInfo = getScoreColor(creditData.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <TrendingUp className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Credit Score</h1>
        </div>

        {/* Credit Score Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-yellow-400/30">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-600 mb-2">Your Credit Score</p>
              <h2 className="text-6xl font-bold text-slate-900 mb-2">{creditData.score}</h2>
              <div className="flex items-center gap-2">
                <span className={`bg-${scoreInfo.bg}-100 text-${scoreInfo.bg}-700 px-4 py-1 rounded-full text-sm font-bold border border-${scoreInfo.bg}-200`}>
                  {scoreInfo.text}
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-bold border border-yellow-200">
                  {creditData.tier} Tier
                </span>
              </div>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-slate-900" />
            </div>
          </div>

          {/* Score Range Indicator */}
          <div className="relative h-4 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-blue-500 rounded-full mb-2">
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 rounded-full border-4 border-white shadow-lg"
              style={{ left: `${((creditData.score - 300) / 550) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-600 mb-4">
            <span>300</span>
            <span>850</span>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <p className="font-bold text-blue-900">Verified by {creditData.bureau}</p>
            </div>
            <p className="text-sm text-blue-700">
              Last Updated: {creditData.reportDate} • Next Update: {creditData.nextUpdate}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-4">
        {/* Score Factors */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-yellow-500" />
            Score Factors
          </h3>
          <div className="space-y-4">
            {creditData.factors.map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-medium text-slate-900">{factor.name}</p>
                    <p className="text-xs text-slate-600">Impact: {factor.impact}</p>
                  </div>
                  <span className={`text-${factor.color}-600 font-bold`}>{factor.score}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r from-${factor.color}-400 to-${factor.color}-500 h-2 rounded-full`}
                    style={{ width: `${factor.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score History */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Score History
          </h3>
          <div className="space-y-3">
            {creditData.history.map((record, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-slate-600">{record.month}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full"
                    style={{ width: `${((record.score - 300) / 550) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-right font-bold text-slate-900">{record.score}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-green-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm font-bold text-green-900">
                Your score increased by 200 points in 6 months! 📈
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-yellow-500" />
            Recommendations
          </h3>
          <ul className="space-y-3">
            {creditData.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-700 font-bold text-xs">{index + 1}</span>
                </div>
                <p className="text-slate-700">{rec}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Unlock Benefits */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-xl">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Unlock Higher Tiers
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3 text-slate-900">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Score 750+: Gold Tier - ₦300,000 limit</span>
            </div>
            <div className="flex items-center gap-3 text-slate-900">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Score 850: Platinum Tier - ₦500,000 limit</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/apply-loan")}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-2xl font-bold"
          >
            Apply for Loan
          </button>
        </div>

        {/* Bureau Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 flex gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-blue-900 mb-1">About Credit Bureau</p>
            <p className="text-sm text-blue-700">
              Your credit information is managed by CRC Credit Bureau Nigeria, a licensed credit bureau regulated by CBN. Your score is calculated based on your loan repayment history and financial behavior.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
