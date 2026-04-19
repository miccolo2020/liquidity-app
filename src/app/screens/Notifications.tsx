import { useNavigate } from "react-router";
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, TrendingUp, Gift, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Loan Approved!",
    message: "Your loan of ₦50,000 has been approved and disbursed to your account.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "reminder",
    title: "Repayment Due Soon",
    message: "Your loan repayment of ₦52,500 is due in 3 days. Pay early to avoid penalties.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "promo",
    title: "Special Offer: Lower Interest Rate!",
    message: "Get 3% interest rate on your next loan. Limited time offer for verified users.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 4,
    type: "info",
    title: "Credit Limit Increased",
    message: "Congratulations! Your credit limit has been increased to ₦500,000 based on your repayment history.",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "success",
    title: "Repayment Successful",
    message: "Your loan repayment of ₦31,500 was successful. Thank you for your timely payment.",
    time: "5 days ago",
    read: true,
  },
  {
    id: 6,
    type: "reminder",
    title: "Complete Your KYC",
    message: "Verify your identity to unlock higher loan limits and exclusive benefits.",
    time: "1 week ago",
    read: true,
  },
];

export function Notifications() {
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter((n) => !n.read);
  const allNotifications = notifications;

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
          <Bell className="w-7 h-7 text-yellow-400" />
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-blue-100">{unreadNotifications.length} unread notifications</p>
          <button className="text-yellow-400 text-sm font-medium hover:underline">Mark all as read</button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadNotifications.length > 0 && `(${unreadNotifications.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {allNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">All Caught Up!</h3>
                <p className="text-gray-600">You have no unread notifications</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Notification Settings */}
        <div className="mt-8 bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Notification Settings
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Loan Updates</p>
                <p className="text-sm text-gray-600">Get notified about loan approvals and disbursements</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Repayment Reminders</p>
                <p className="text-sm text-gray-600">Receive reminders before payment due dates</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Promotional Offers</p>
                <p className="text-sm text-gray-600">Get exclusive deals and special offers</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Account Activities</p>
                <p className="text-sm text-gray-600">Notifications about your account and transactions</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: any }) {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      case "reminder":
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      case "info":
        return <TrendingUp className="w-6 h-6 text-blue-600" />;
      case "promo":
        return <Gift className="w-6 h-6 text-purple-600" />;
      default:
        return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-100";
      case "reminder":
        return "bg-orange-100";
      case "info":
        return "bg-blue-100";
      case "promo":
        return "bg-gradient-to-br from-purple-100 to-yellow-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-4 ${!notification.read ? "border-2 border-emerald-200" : ""}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${getBgColor()} rounded-xl flex items-center justify-center flex-shrink-0`}>
          {getIcon()}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-bold text-gray-900">{notification.title}</h4>
            {!notification.read && (
              <div className="w-2 h-2 bg-emerald-600 rounded-full ml-2 mt-2"></div>
            )}
          </div>
          <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.time}</p>
        </div>
      </div>
    </div>
  );
}