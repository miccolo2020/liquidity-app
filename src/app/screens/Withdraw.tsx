import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  ArrowLeft, 
  ArrowDownLeft,
  Building2,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Wallet
} from "lucide-react";

export function Withdraw() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const walletBalance = 50000; // Mock wallet balance
  const minWithdraw = 1000;

  const savedBankAccounts = [
    { id: "1", bank: "GTBank", accountNumber: "0123456789", accountName: "Chukwudi Okafor" },
    { id: "2", bank: "Access Bank", accountNumber: "9876543210", accountName: "Chukwudi Okafor" },
    { id: "3", bank: "PalmPay", accountNumber: "08012345678", accountName: "Chukwudi Okafor" },
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseInt(amount);
    
    if (withdrawAmount < minWithdraw) {
      alert(`Minimum withdrawal is ₦${minWithdraw.toLocaleString()}`);
      return;
    }
    
    if (withdrawAmount > walletBalance) {
      alert("Insufficient wallet balance");
      return;
    }

    setProcessing(true);

    // Simulate withdrawal processing
    setTimeout(() => {
      setProcessing(false);
      setWithdrawSuccess(true);
      
      setTimeout(() => {
        navigate("/wallet");
      }, 2500);
    }, 2000);
  };

  if (withdrawSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Withdrawal Successful!</h2>
            <p className="text-slate-600 mb-4">
              ₦{parseInt(amount).toLocaleString()} has been sent to your account
            </p>
            <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
              <p className="text-sm text-green-800 font-medium">
                Funds will arrive within 5-10 minutes
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
            onClick={() => navigate("/wallet")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <ArrowDownLeft className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Withdraw Funds</h1>
        </div>

        {/* Wallet Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-yellow-400/30">
          <p className="text-sm text-slate-600 mb-1">Available Balance</p>
          <h2 className="text-3xl font-bold text-slate-900">
            ₦{walletBalance.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Withdrawal Form */}
      <div className="px-6 mt-6">
        <form onSubmit={handleWithdraw} className="space-y-6">
          {/* Amount */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="amount" className="text-slate-700 font-bold">Withdrawal Amount</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-lg font-bold">
                ₦
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-16 text-2xl pl-12 bg-slate-50 border-slate-300 rounded-2xl font-bold"
                min={minWithdraw}
                max={walletBalance}
                required
              />
            </div>
            <p className="text-sm text-slate-600">
              Min: ₦{minWithdraw.toLocaleString()} • Max: ₦{walletBalance.toLocaleString()}
            </p>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {[5000, 10000, 25000, 50000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  onClick={() => setAmount(quickAmount.toString())}
                  disabled={quickAmount > walletBalance}
                  className="py-2 px-3 bg-slate-100 hover:bg-yellow-100 rounded-xl text-sm font-medium text-slate-700 hover:text-yellow-700 border-2 border-slate-200 hover:border-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  ₦{(quickAmount / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Bank Account Selection */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label className="text-slate-700 font-bold">Withdraw To</Label>
            <Select value={bankAccount} onValueChange={setBankAccount}>
              <SelectTrigger className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {savedBankAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex items-center gap-3">
                      {account.bank === "PalmPay" ? (
                        <Smartphone className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Building2 className="w-5 h-5 text-blue-600" />
                      )}
                      <div className="text-left">
                        <p className="font-medium">{account.bank}</p>
                        <p className="text-sm text-slate-600">{account.accountNumber}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <button
              type="button"
              onClick={() => navigate("/bank-details")}
              className="text-sm text-yellow-600 font-medium hover:underline"
            >
              + Add New Bank Account
            </button>
          </div>

          {/* Transaction Summary */}
          {amount && bankAccount && (
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold mb-4 text-slate-900">Transaction Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-800">Withdrawal Amount</span>
                  <span className="font-bold text-slate-900">₦{parseInt(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-800">Transaction Fee</span>
                  <span className="font-bold text-slate-900">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-800">Destination</span>
                  <span className="font-bold text-slate-900">
                    {savedBankAccounts.find(acc => acc.id === bankAccount)?.bank}
                  </span>
                </div>
                <div className="border-t-2 border-slate-900/20 pt-3 flex justify-between">
                  <span className="text-slate-900">You'll Receive</span>
                  <span className="text-2xl font-bold text-slate-900">
                    ₦{parseInt(amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 mb-1">Instant Withdrawal</p>
              <p className="text-sm text-blue-700">
                Funds will be credited to your account within 5-10 minutes. No fees!
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!amount || !bankAccount || processing}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-3xl font-bold shadow-xl disabled:opacity-50"
          >
            {processing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              `Withdraw ${amount ? '₦' + parseInt(amount).toLocaleString() : 'Funds'}`
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
