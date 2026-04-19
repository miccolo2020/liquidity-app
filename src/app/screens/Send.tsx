import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  ArrowLeft, 
  ArrowUpRight,
  User,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export function Send() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"amount" | "recipient" | "confirm">("amount");
  const [amount, setAmount] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);

  const walletBalance = 50000;

  const handleAmountNext = (e: React.FormEvent) => {
    e.preventDefault();
    const sendAmount = parseInt(amount);
    
    if (sendAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    if (sendAmount > walletBalance) {
      alert("Insufficient wallet balance");
      return;
    }
    
    setStep("recipient");
  };

  const handleRecipientNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock recipient lookup
    setRecipientName("Adewale Johnson");
    setStep("confirm");
  };

  const handleSend = () => {
    setSuccess(true);
    setTimeout(() => {
      navigate("/wallet");
    }, 2500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Money Sent!</h2>
            <p className="text-slate-600 mb-4">
              ₦{parseInt(amount).toLocaleString()} sent to {recipientName}
            </p>
            <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
              <p className="text-sm text-green-800 font-medium">
                Transaction completed successfully
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => step === "amount" ? navigate("/wallet") : setStep(step === "confirm" ? "recipient" : "amount")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <ArrowUpRight className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Send Money</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex-1 h-2 rounded-full ${step === "amount" ? "bg-yellow-400" : "bg-white/20"}`}></div>
          <div className={`flex-1 h-2 rounded-full ${step === "recipient" ? "bg-yellow-400" : "bg-white/20"}`}></div>
          <div className={`flex-1 h-2 rounded-full ${step === "confirm" ? "bg-yellow-400" : "bg-white/20"}`}></div>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-yellow-400/30">
          <p className="text-sm text-slate-600 mb-1">Available Balance</p>
          <h2 className="text-2xl font-bold text-slate-900">
            ₦{walletBalance.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6">
        {/* Amount Step */}
        {step === "amount" && (
          <form onSubmit={handleAmountNext} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
              <Label htmlFor="amount" className="text-slate-700 font-bold">Enter Amount</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-2xl font-bold">
                  ₦
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-20 text-4xl pl-14 bg-slate-50 border-slate-300 rounded-2xl font-bold text-center"
                  min="1"
                  max={walletBalance}
                  required
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {[1000, 2000, 5000, 10000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-3 px-2 bg-slate-100 hover:bg-yellow-100 rounded-xl text-sm font-medium text-slate-700 hover:text-yellow-700 border-2 border-slate-200 hover:border-yellow-400 transition-all"
                  >
                    ₦{(quickAmount / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-3xl font-bold shadow-xl"
            >
              Continue
            </Button>
          </form>
        )}

        {/* Recipient Step */}
        {step === "recipient" && (
          <form onSubmit={handleRecipientNext} className="space-y-6">
            <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
              <Label htmlFor="phone" className="text-slate-700 font-bold">Recipient Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="080 1234 5678"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                required
              />
              <p className="text-sm text-slate-600">Enter the phone number registered with Liquidity</p>
            </div>

            <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
              <Label htmlFor="note" className="text-slate-700 font-bold">Note (Optional)</Label>
              <Input
                id="note"
                type="text"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-3xl font-bold shadow-xl"
            >
              Continue
            </Button>
          </form>
        )}

        {/* Confirm Step */}
        {step === "confirm" && (
          <div className="space-y-6">
            {/* Transaction Summary */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
              <h3 className="font-bold text-slate-900 mb-4">Transaction Details</h3>
              
              {/* Recipient */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-slate-100">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-slate-900" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Sending to</p>
                  <p className="font-bold text-slate-900">{recipientName}</p>
                  <p className="text-sm text-slate-600">{recipientPhone}</p>
                </div>
              </div>

              {/* Amount Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount</span>
                  <span className="font-bold text-slate-900">₦{parseInt(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Transaction Fee</span>
                  <span className="font-bold text-green-600">FREE</span>
                </div>
                {note && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Note</span>
                    <span className="font-medium text-slate-900">{note}</span>
                  </div>
                )}
                <div className="border-t-2 border-slate-100 pt-3 flex justify-between">
                  <span className="text-slate-900 font-bold">Total</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ₦{parseInt(amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 flex gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-700">
                Money will be sent instantly to the recipient's Liquidity wallet.
              </p>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-3xl font-bold shadow-xl"
            >
              Send ₦{parseInt(amount).toLocaleString()}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
