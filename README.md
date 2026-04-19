# 💰 Liquidity - Nigerian Loan App

A comprehensive Nigerian loan mobile app built with **React**, **Tailwind CSS**, and **Capacitor** for Android.

## 🎨 Features

- ✅ Quick loan approval
- ✅ Security features & KYC verification
- ✅ Flexible repayment options
- ✅ Wallet functionality
- ✅ Loan calculator
- ✅ Nigerian Credit Bureau (CRC) integration
- ✅ PalmPay disbursement integration
- ✅ Progressive loan limits (₦5,000 → Platinum tier)
- ✅ Complete authentication flow
- ✅ Mobile-first responsive design (Navy blue & yellow theme)

## 🚀 Build APK (3 Steps)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Add Liquidity app"
git remote add origin https://github.com/YOUR_USERNAME/liquidity-app.git
git branch -M main
git push -u origin main
```

### 2. Trigger GitHub Actions Build
- Go to **Actions** tab in your GitHub repo
- Click **"Build Android APK"** → **"Run workflow"**

### 3. Download APK
- Wait 3-5 minutes
- Download from **Artifacts** section
- Install on Android device

**See [QUICK_START_APK.md](./QUICK_START_APK.md) for details.**

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Build web app
pnpm run build

# Sync with Capacitor
pnpm run cap:sync
```

## 📱 App Structure

- **Onboarding Flow**: Splash → OTP → Loan Limit → Profile Form → Dashboard
- **Loan Tiers**: Basic → Bronze → Silver → Gold → Platinum
- **First-time users**: Locked to ₦5,000 for 7 days
- **Loan fees**: 2% extension fee, 1% daily late fee

## 📦 Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Mobile**: Capacitor 8
- **UI Components**: Radix UI, Material UI
- **Forms**: React Hook Form
- **Routing**: React Router

## 📄 License

Private project - All rights reserved

---

Built with ❤️ for Nigerian loan seekers
