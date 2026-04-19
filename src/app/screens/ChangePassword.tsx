import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export function ChangePassword() {
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // Mock password change
    setSuccess(true);
    setTimeout(() => {
      navigate("/profile");
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-green-200">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Password Changed!</h2>
            <p className="text-slate-600">
              Your password has been successfully updated.
            </p>
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
            onClick={() => navigate("/profile")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Lock className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Change Password</h1>
        </div>

        <p className="text-blue-100">Update your password to keep your account secure</p>
      </div>

      {/* Form */}
      <div className="px-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="oldPassword" className="text-slate-700 font-bold">Current Password</Label>
            <div className="relative">
              <Input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={formData.oldPassword}
                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="newPassword" className="text-slate-700 font-bold">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-slate-600">Must be at least 6 characters long</p>
          </div>

          {/* Confirm Password */}
          <div className="bg-white rounded-3xl p-6 space-y-4 border-2 border-slate-200 shadow-lg">
            <Label htmlFor="confirmPassword" className="text-slate-700 font-bold">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="h-14 text-lg bg-slate-50 border-slate-300 rounded-2xl pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 mb-2">Password Security Tips</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use a mix of letters, numbers, and symbols</li>
                <li>• Avoid using personal information</li>
                <li>• Don't reuse passwords from other accounts</li>
                <li>• Change your password regularly</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 h-14 text-lg rounded-3xl font-bold shadow-xl"
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
