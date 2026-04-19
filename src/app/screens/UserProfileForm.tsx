import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Wallet, User, Mail, MapPin, Briefcase, Calendar, ArrowLeft } from "lucide-react";

export function UserProfileForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    occupation: "",
    monthlyIncome: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store user profile data
    localStorage.setItem("userProfile", JSON.stringify(formData));
    // Navigate to dashboard
    navigate("/dashboard");
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100">
      {/* Header with curved bottom */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-b-[3rem] pb-8 pt-6 px-6 shadow-2xl">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/20"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-7 h-7 text-slate-900" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Liquidity
          </h1>
        </div>

        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full flex items-center justify-center border-4 border-yellow-400/30">
            <User className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Complete Your Profile
          </h2>
          <p className="text-blue-100">
            Help us know you better to serve you best
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="fullName" className="text-slate-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-yellow-500" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-2xl"
              required
            />
          </div>

          {/* Email */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="email" className="text-slate-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-500" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-2xl"
              required
            />
          </div>

          {/* Date of Birth */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="dob" className="text-slate-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-500" />
              Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-2xl"
              required
            />
          </div>

          {/* Address */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="address" className="text-slate-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-yellow-500" />
              Residential Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-2xl"
              required
            />
          </div>

          {/* Occupation */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="occupation" className="text-slate-700 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-yellow-500" />
              Occupation
            </Label>
            <Input
              id="occupation"
              type="text"
              placeholder="What do you do?"
              value={formData.occupation}
              onChange={(e) => handleChange("occupation", e.target.value)}
              className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-2xl"
              required
            />
          </div>

          {/* Monthly Income */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="income" className="text-slate-700 mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-yellow-500" />
              Monthly Income (₦)
            </Label>
            <Input
              id="income"
              type="number"
              placeholder="Enter monthly income"
              value={formData.monthlyIncome}
              onChange={(e) => handleChange("monthlyIncome", e.target.value)}
              className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-2xl"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-16 text-lg rounded-3xl font-bold shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </form>

        {/* Progress indicator */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-8 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-8 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-8 h-2 bg-slate-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}