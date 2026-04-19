import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  ArrowLeft, 
  CreditCard, 
  Building2, 
  Smartphone, 
  CheckCircle2,
  AlertCircle,
  Wallet
} from "lucide-react";

export function Repayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("52500"); // ₦50,000 + 5% interest
  const [accountNumber, setAccountNumber] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock active loan data
  const activeLoan = {
    id: "LOAN_001",
    principal: 50000,
    interest: 2500,
    total: 52500,
    dueDate: "March 4, 2026",
    daysRemaining: 7,
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Payment Successful!</h2>
            <p className="text-slate-600 mb-6">
              Your loan has been repaid. Your credit score has been updated!
            </p>
            <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
              <p className="text-sm text-green-800 font-medium">
                🎉 Your credit limit has been increased!
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
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Wallet className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Loan Repayment</h1>
        </div>

        {/* Loan Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-yellow-400/30">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Amount Due</p>
              <h2 className="text-3xl font-bold text-slate-900">
                ₦{activeLoan.total.toLocaleString()}
              </h2>
            </div>
            <div className="bg-red-100 px-3 py-1 rounded-full border border-red-200">
              <p className="text-sm font-bold text-red-700">{activeLoan.daysRemaining} days left</p>
            </div>
          </div>
          <div className="space-y-2 pt-4 border-t-2 border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Principal Amount</span>
              <span className="font-medium text-slate-900">₦{activeLoan.principal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Interest (5%)</span>
              <span className="font-medium text-slate-900">₦{activeLoan.interest.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Due Date</span>
              <span className="font-medium text-slate-900">{activeLoan.dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="px-6 mt-6">
        <form onSubmit={handlePayment} className="space-y-6">
          {/* Payment Method */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label className="text-slate-700 font-bold">Select Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl">
                <SelectValue placeholder="Choose payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Debit/Credit Card</span>
                  </div>
                </SelectItem>
                <SelectItem value="bank">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-green-600" />
                    <span>Bank Transfer</span>
                  </div>
                </SelectItem>
                <SelectItem value="palmpay">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <span>PalmPay</span>
                  </div>
                </SelectItem>
                <SelectItem value="ussd">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-yellow-600" />
                    <span>USSD</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Details */}
          {paymentMethod && (
            <>
              {paymentMethod === "card" && (
                <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-slate-700">Card Number</Label>
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-slate-700">Expiry</Label>
                      <Input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-slate-700">CVV</Label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
                  <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                    <p className="font-bold text-blue-900 mb-2">Transfer to:</p>
                    <div className="space-y-1">
                      <p className="text-sm text-blue-700">Bank: Wema Bank</p>
                      <p className="text-sm text-blue-700">Account Number: 9876543210</p>
                      <p className="text-sm text-blue-700">Account Name: Liquidity Loans Ltd</p>
                      <p className="text-sm text-blue-700 font-bold">Amount: ₦{activeLoan.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reference" className="text-slate-700">Payment Reference</Label>
                    <Input
                      id="reference"
                      type="text"
                      placeholder="Enter transaction reference"
                      className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "palmpay" && (
                <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
                  <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                    <p className="font-bold text-purple-900 mb-2">Pay with PalmPay:</p>
                    <div className="space-y-1">
                      <p className="text-sm text-purple-700">PalmPay ID: @liquidityloans</p>
                      <p className="text-sm text-purple-700 font-bold">Amount: ₦{activeLoan.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="palmpayPhone" className="text-slate-700">Your PalmPay Phone Number</Label>
                    <Input
                      id="palmpayPhone"
                      type="tel"
                      placeholder="08012345678"
                      className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "ussd" && (
                <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
                  <div className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200">
                    <p className="font-bold text-yellow-900 mb-2">USSD Payment:</p>
                    <div className="space-y-2">
                      <p className="text-sm text-yellow-700">1. Dial <span className="font-bold">*737*50*{activeLoan.total}*9876543210#</span></p>
                      <p className="text-sm text-yellow-700">2. Follow the prompts on your phone</p>
                      <p className="text-sm text-yellow-700">3. Enter your PIN to complete</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Important Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-4 flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 mb-1">Repayment Benefits</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✓ Improve your credit score</li>
                <li>✓ Unlock higher loan limits</li>
                <li>✓ Access longer repayment periods</li>
                <li>✓ Lower interest rates on future loans</li>
              </ul>
            </div>
          </div>

          {/* Pay Button */}
          <Button
            type="submit"
            disabled={!paymentMethod || processing}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-3xl font-bold shadow-xl disabled:opacity-50"
          >
            {processing ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ₦${activeLoan.total.toLocaleString()} Now`
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
