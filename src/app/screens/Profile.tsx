import { useNavigate } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight,
  Shield,
  CreditCard,
  Building2,
  Star,
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Lock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 pt-12 pb-20 rounded-b-[3rem] shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <Settings className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Profile & Settings</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-4 border-yellow-400/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 text-2xl font-bold">
                CO
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">Chukwudi Okafor</h2>
              <p className="text-slate-600">chukwudi@email.com</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                  ✓ Verified
                </div>
                <div className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                  Score: 720
                </div>
              </div>
            </div>
            <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200">
              <Edit className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-10 space-y-4">
        {/* Personal Information */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-yellow-500" />
            Personal Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 py-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">Full Name</p>
                <p className="font-medium text-slate-900">Chukwudi Okafor</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="flex items-center gap-4 py-3 border-t-2 border-slate-100">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">Phone Number</p>
                <p className="font-medium text-slate-900">+234 801 234 5678</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="flex items-center gap-4 py-3 border-t-2 border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">Email Address</p>
                <p className="font-medium text-slate-900">chukwudi@email.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="flex items-center gap-4 py-3 border-t-2 border-slate-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">Address</p>
                <p className="font-medium text-slate-900">Lagos, Nigeria</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-yellow-500" />
            Account Settings
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/credit-score")}
              className="w-full flex items-center gap-4 py-3"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-900">Credit Score</p>
                <p className="text-sm text-slate-600">View your credit report</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/bank-details")}
              className="w-full flex items-center gap-4 py-3 border-t-2 border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-900">Bank Details</p>
                <p className="text-sm text-slate-600">Manage your bank accounts</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/kyc")}
              className="w-full flex items-center gap-4 py-3 border-t-2 border-slate-100"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-900">KYC Verification</p>
                <p className="text-sm text-slate-600">Verify your identity</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => navigate("/notifications")}
              className="w-full flex items-center gap-4 py-3 border-t-2 border-slate-100"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-900">Notifications</p>
                <p className="text-sm text-slate-600">Manage notification settings</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button 
              onClick={() => navigate("/change-password")}
              className="w-full flex items-center gap-4 py-3 border-t-2 border-slate-100"
            >
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-900">Change Password</p>
                <p className="text-sm text-slate-600">Update your password</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-lg">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-500" />
            Support
          </h3>
          <div className="space-y-3">
            <button 
              onClick={() => navigate("/help-center")}
              className="w-full flex items-center gap-4 py-3"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-900">Help Center</p>
                <p className="text-sm text-slate-600">Get answers to your questions</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button 
              onClick={() => navigate("/contact-us")}
              className="w-full flex items-center gap-4 py-3 border-t-2 border-slate-100"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-slate-900">Contact Us</p>
                <p className="text-sm text-slate-600">support@liquidity.ng</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-3xl p-5 flex items-center justify-center gap-3 font-bold shadow-lg"
        >
          <LogOut className="w-6 h-6" />
          Logout
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}