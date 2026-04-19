# 🚀 Quick Start - Build APK in 5 Steps

## Prerequisites
- ✅ Node.js installed
- ✅ Android Studio installed
- ✅ Android SDK configured

---

## 📱 5-Step APK Build Process

### Step 1️⃣: Install Dependencies
```bash
npm install
```

### Step 2️⃣: Build Your Web App
```bash
npm run build
```

### Step 3️⃣: Add Android Platform
```bash
npx cap add android
```

### Step 4️⃣: Sync Web App to Android
```bash
npx cap sync
```

### Step 5️⃣: Build APK
```bash
# Open Android Studio
npm run cap:open

# Then in Android Studio:
# Build → Build Bundle(s) / APK(s) → Build APK(s)
```

**Or build via command line:**
```bash
cd android
./gradlew assembleDebug
```

---

## 📍 Find Your APK
Your APK will be located at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔄 Update APK After Changes
```bash
npm run cap:build
cd android
./gradlew assembleDebug
```

---

## 📖 Need Help?
See **BUILD_APK_GUIDE.md** for detailed instructions.
