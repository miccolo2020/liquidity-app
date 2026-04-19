import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, Plus, Trash2, CheckCircle2, Building2 } from "lucide-react";

const savedBanks = [
  {
    id: 1,
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "Chukwudi Okafor",
    isPrimary: true,
  },
  {
    id: 2,
    bankName: "Access Bank",
    accountNumber: "0987654321",
    accountName: "Chukwudi Okafor",
    isPrimary: false,
  },
];

export function BankDetails() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Bank account added successfully!");
    setShowAddForm(false);
    setFormData({ bankName: "", accountNumber: "", accountName: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Building2 className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Bank Details</h1>
        </div>

        <p className="text-blue-100">Manage your bank accounts for loan disbursement</p>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-4">
        {/* Add Bank Button */}
        {!showAddForm && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-14 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Bank Account
          </Button>
        )}

        {/* Add Bank Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Add Bank Account</h3>
            <form onSubmit={handleAddBank} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Select
                  value={formData.bankName}
                  onValueChange={(value) => setFormData({ ...formData, bankName: value })}
                >
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gtbank">GTBank</SelectItem>
                    <SelectItem value="access">Access Bank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="first">First Bank</SelectItem>
                    <SelectItem value="uba">UBA</SelectItem>
                    <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                    <SelectItem value="union">Union Bank</SelectItem>
                    <SelectItem value="stanbic">Stanbic IBTC</SelectItem>
                    <SelectItem value="sterling">Sterling Bank</SelectItem>
                    <SelectItem value="wema">Wema Bank</SelectItem>
                    <SelectItem value="palmpay">PalmPay</SelectItem>
                    <SelectItem value="opay">OPay</SelectItem>
                    <SelectItem value="kuda">Kuda Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  type="text"
                  placeholder="Enter 10-digit account number"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="h-14 text-lg"
                  maxLength={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  type="text"
                  placeholder="Account name will appear here"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className="h-14 text-lg"
                  disabled
                />
                <p className="text-xs text-gray-500">Account name is auto-verified</p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl"
                >
                  Add Account
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Saved Banks */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 text-lg">Saved Accounts</h3>
          {savedBanks.map((bank) => (
            <div key={bank.id} className="bg-white rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{bank.bankName}</h4>
                      <p className="text-gray-600">{bank.accountNumber}</p>
                      <p className="text-sm text-gray-500">{bank.accountName}</p>
                    </div>
                    {bank.isPrimary && (
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Primary
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    {!bank.isPrimary && (
                      <Button
                        variant="outline"
                        className="flex-1 h-10 text-sm rounded-lg border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                      >
                        Set as Primary
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="h-10 px-4 text-sm rounded-lg border-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border border-blue-200 rounded-2xl p-5">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Why add a bank account?
          </h4>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Faster loan disbursement (within 2 minutes)</li>
            <li>• Easy loan repayment via direct debit</li>
            <li>• Secure and verified by BVN</li>
            <li>• Set multiple accounts for flexibility</li>
          </ul>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h4 className="font-bold text-yellow-900 mb-2">Important Note</h4>
          <p className="text-sm text-yellow-800">
            Your bank account must match the name on your Liquidity account. Only Nigerian bank accounts are accepted.
          </p>
        </div>
      </div>
    </div>
  );
}