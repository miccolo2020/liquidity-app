import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Wallet, User, Mail, Phone, Lock } from "lucide-react";

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    navigate("/phone-verify");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-8 pt-12 pb-20 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-8 h-8 text-slate-900" />
          </div>
          <h2 className="text-2xl font-bold text-white">Liquidity</h2>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-blue-100">Join thousands of satisfied customers</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-8 py-8 overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="bg-white rounded-3xl p-5 space-y-3 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="fullName" className="text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-yellow-500" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
              required
            />
          </div>

          {/* Email */}
          <div className="bg-white rounded-3xl p-5 space-y-3 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="email" className="text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-500" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
              required
            />
          </div>

          {/* Phone */}
          <div className="bg-white rounded-3xl p-5 space-y-3 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="phone" className="text-slate-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-500" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 801 234 5678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
              required
            />
          </div>

          {/* Password */}
          <div className="bg-white rounded-3xl p-5 space-y-3 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="password" className="text-slate-700 flex items-center gap-2">
              <Lock className="w-4 h-4 text-yellow-500" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="bg-white rounded-3xl p-5 space-y-3 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="confirmPassword" className="text-slate-700 flex items-center gap-2">
              <Lock className="w-4 h-4 text-yellow-500" />
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl"
              required
            />
          </div>

          {/* Register Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-2xl font-bold shadow-xl mt-6"
            >
              Create Account
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center pb-6">
            <p className="text-slate-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-yellow-600 font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
