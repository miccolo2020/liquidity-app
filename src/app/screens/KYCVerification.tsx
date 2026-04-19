import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, Upload, Camera, CheckCircle2, Shield } from "lucide-react";

export function KYCVerification() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
    bvn: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert("KYC Verification submitted successfully!");
      navigate("/dashboard");
    }
  };

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
          <Shield className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">KYC Verification</h1>
        </div>

        <p className="text-blue-100 mb-6">Complete your verification to unlock full access</p>

        {/* Progress Steps */}
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step
                    ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900"
                    : "bg-white/20 text-white"
                }`}
              >
                {s < step ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    s < step ? "bg-yellow-400" : "bg-white/20"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="px-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: ID Information */}
          {step === 1 && (
            <>
              <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
                <Label className="text-slate-700">ID Type</Label>
                <Select
                  value={formData.idType}
                  onValueChange={(value) => setFormData({ ...formData, idType: value })}
                >
                  <SelectTrigger className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nin">National ID (NIN)</SelectItem>
                    <SelectItem value="drivers">Driver's License</SelectItem>
                    <SelectItem value="passport">International Passport</SelectItem>
                    <SelectItem value="voters">Voter's Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
                <Label htmlFor="idNumber" className="text-slate-700">ID Number</Label>
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="Enter your ID number"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                  required
                />
              </div>

              <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
                <Label htmlFor="bvn" className="text-slate-700">BVN (Bank Verification Number)</Label>
                <Input
                  id="bvn"
                  type="text"
                  placeholder="Enter your BVN"
                  value={formData.bvn}
                  onChange={(e) => setFormData({ ...formData, bvn: e.target.value })}
                  className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
                  maxLength={11}
                  required
                />
                <p className="text-sm text-slate-600">Your BVN is safe and encrypted</p>
              </div>
            </>
          )}

          {/* Step 2: Document Upload */}
          {step === 2 && (
            <div className="bg-white rounded-3xl p-6 space-y-6 border-2 border-slate-200 shadow-lg">
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-yellow-500" />
                  Upload ID Document
                </h3>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-700 font-medium mb-2">
                    Upload a clear photo of your ID
                  </p>
                  <p className="text-sm text-slate-500 mb-4">
                    PNG, JPG or PDF (max 5MB)
                  </p>
                  <Button type="button" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 rounded-2xl">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Selfie Verification */}
          {step === 3 && (
            <div className="bg-white rounded-3xl p-6 space-y-6 border-2 border-slate-200 shadow-lg">
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-yellow-500" />
                  Take a Selfie
                </h3>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50">
                  <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-700 font-medium mb-2">
                    Take a clear selfie holding your ID
                  </p>
                  <p className="text-sm text-slate-500 mb-4">
                    Hold your phone at eye level and make sure your face is clearly visible
                  </p>
                  <Button type="button" className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 rounded-2xl">
                    Open Camera
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button
                type="button"
                onClick={() => setStep(step - 1)}
                variant="outline"
                className="flex-1 h-14 text-lg rounded-2xl border-2 border-slate-300 font-bold"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-2xl font-bold shadow-xl"
            >
              {step === 3 ? "Submit Verification" : "Continue"}
            </Button>
          </div>
        </form>

        {/* Benefits */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-3xl p-6 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold mb-4 text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-yellow-600" />
            Verification Benefits
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700">Higher loan limits up to ₦500,000</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700">Lower interest rates</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700">Faster approval process</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700">Access to premium features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
