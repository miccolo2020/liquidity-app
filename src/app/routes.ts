import { createBrowserRouter } from "react-router";
import { Splash } from "./screens/Splash";
import { PhoneVerification } from "./screens/PhoneVerification";
import { OTPVerification } from "./screens/OTPVerification";
import { UserProfileForm } from "./screens/UserProfileForm";
import { DrawLimit } from "./screens/DrawLimit";
import { Onboarding } from "./screens/Onboarding";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Dashboard } from "./screens/Dashboard";
import { LoanApplication } from "./screens/LoanApplication";
import { LoanCalculator } from "./screens/LoanCalculator";
import { LoanHistory } from "./screens/LoanHistory";
import { LoanExtension } from "./screens/LoanExtension";
import { Profile } from "./screens/Profile";
import { KYCVerification } from "./screens/KYCVerification";
import { Wallet } from "./screens/Wallet";
import { BankDetails } from "./screens/BankDetails";
import { Notifications } from "./screens/Notifications";
import { Repayment } from "./screens/Repayment";
import { Withdraw } from "./screens/Withdraw";
import { CreditScore } from "./screens/CreditScore";
import { ChangePassword } from "./screens/ChangePassword";
import { HelpCenter } from "./screens/HelpCenter";
import { ContactUs } from "./screens/ContactUs";
import { Send } from "./screens/Send";
import { Receive } from "./screens/Receive";
import { Cards } from "./screens/Cards";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/phone-verify",
    Component: PhoneVerification,
  },
  {
    path: "/verify-otp",
    Component: OTPVerification,
  },
  {
    path: "/profile-form",
    Component: UserProfileForm,
  },
  {
    path: "/draw-limit",
    Component: DrawLimit,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/apply-loan",
    Component: LoanApplication,
  },
  {
    path: "/calculator",
    Component: LoanCalculator,
  },
  {
    path: "/history",
    Component: LoanHistory,
  },
  {
    path: "/extend-loan",
    Component: LoanExtension,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/kyc",
    Component: KYCVerification,
  },
  {
    path: "/wallet",
    Component: Wallet,
  },
  {
    path: "/bank-details",
    Component: BankDetails,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
  {
    path: "/repayment",
    Component: Repayment,
  },
  {
    path: "/withdraw",
    Component: Withdraw,
  },
  {
    path: "/credit-score",
    Component: CreditScore,
  },
  {
    path: "/change-password",
    Component: ChangePassword,
  },
  {
    path: "/help-center",
    Component: HelpCenter,
  },
  {
    path: "/contact-us",
    Component: ContactUs,
  },
  {
    path: "/send",
    Component: Send,
  },
  {
    path: "/receive",
    Component: Receive,
  },
  {
    path: "/cards",
    Component: Cards,
  },
]);
