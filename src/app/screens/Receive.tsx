import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  ArrowLeft, 
  ArrowDownLeft,
  Copy,
  Share2,
  QrCode,
  CheckCircle2
} from "lucide-react";

export function Receive() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");

  // Mock user data
  const userData = {
    name: "Chukwudi Okafor",
    phone: "+234 801 234 5678",
    accountNumber: "9876543210",
    bankName: "Liquidity Wallet",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const message = `Send money to ${userData.name}\nPhone: ${userData.phone}\nAccount: ${userData.accountNumber}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Send me money on Liquidity",
        text: message,
      });
    } else {
      handleCopy(message);
    }
  };

  const generatePaymentLink = () => {
    return `https://liquidity.ng/pay/${userData.phone.replace(/\s+/g, "")}${amount ? `?amount=${amount}` : ""}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/wallet")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <ArrowDownLeft className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Receive Money</h1>
        </div>

        <p className="text-blue-100">Share your details to receive payments</p>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-6">
        {/* QR Code Section */}
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg text-center">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl flex items-center justify-center mb-6 border-4 border-yellow-400/30">
            <QrCode className="w-32 h-32 text-slate-700" />
          </div>
          <p className="font-bold text-slate-900 text-lg mb-2">{userData.name}</p>
          <p className="text-slate-600">{userData.phone}</p>
          <p className="text-sm text-slate-500 mt-2">Scan to send money</p>
        </div>

        {/* Request Specific Amount */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4">Request Specific Amount (Optional)</h3>
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xl font-bold">
              ₦
            </span>
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-16 text-2xl pl-12 bg-slate-50 border-slate-300 rounded-2xl font-bold text-center"
              min="0"
            />
          </div>
          <p className="text-sm text-slate-600">
            Enter an amount to request a specific payment
          </p>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4">Share Your Account Details</h3>
          
          <div className="space-y-4">
            {/* Phone Number */}
            <div>
              <p className="text-sm text-slate-600 mb-2">Phone Number</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                  <p className="font-bold text-slate-900">{userData.phone}</p>
                </div>
                <button
                  onClick={() => handleCopy(userData.phone)}
                  className="w-12 h-12 bg-yellow-100 hover:bg-yellow-200 rounded-xl flex items-center justify-center border-2 border-yellow-200 transition-all"
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-yellow-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Account Number */}
            <div>
              <p className="text-sm text-slate-600 mb-2">Account Number</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                  <p className="font-bold text-slate-900">{userData.accountNumber}</p>
                  <p className="text-sm text-slate-600">{userData.bankName}</p>
                </div>
                <button
                  onClick={() => handleCopy(userData.accountNumber)}
                  className="w-12 h-12 bg-yellow-100 hover:bg-yellow-200 rounded-xl flex items-center justify-center border-2 border-yellow-200 transition-all"
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-yellow-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Account Name */}
            <div>
              <p className="text-sm text-slate-600 mb-2">Account Name</p>
              <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                <p className="font-bold text-slate-900">{userData.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Link */}
        {amount && (
          <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold text-slate-900 mb-3">Payment Link</h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/20">
              <p className="text-sm text-slate-900 break-all">{generatePaymentLink()}</p>
            </div>
            <button
              onClick={() => handleCopy(generatePaymentLink())}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              Copy Payment Link
            </button>
          </div>
        )}

        {/* Share Button */}
        <Button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-3xl font-bold shadow-xl flex items-center justify-center gap-3"
        >
          <Share2 className="w-5 h-5" />
          Share Payment Details
        </Button>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 text-center">
          <p className="text-sm text-blue-700">
            💡 Anyone can send you money using your phone number or account number
          </p>
        </div>
      </div>
    </div>
  );
}
