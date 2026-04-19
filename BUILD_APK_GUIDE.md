# 📱 Building Liquidity Android APK - Complete Guide

This guide will walk you through building your Liquidity loan app into a native Android APK.

---

## 🎯 Prerequisites

Before you start, make sure you have:

1. **Node.js** installed (v18 or higher)
2. **Android Studio** installed
3. **Java Development Kit (JDK)** 17 or higher

---

## 📥 Step 1: Install Android Studio

1. Download Android Studio from: https://developer.android.com/studio
2. Install Android Studio
3. During installation, make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

4. Open Android Studio and go to:
   - **Tools** → **SDK Manager**
   - Under **SDK Platforms**, install Android 13 (API Level 33) or higher
   - Under **SDK Tools**, make sure these are installed:
     - Android SDK Build-Tools
     - Android SDK Command-line Tools
     - Android Emulator
     - Android SDK Platform-Tools

---

## 🔧 Step 2: Set Up Environment Variables

### For Windows:
1. Open System Properties → Environment Variables
2. Add these to System Variables:
   ```
   ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
   JAVA_HOME = C:\Program Files\Android\Android Studio\jbr
   ```
3. Add to PATH:
   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```

### For Mac/Linux:
1. Open terminal and edit your profile:
   ```bash
   nano ~/.bash_profile
   # or for zsh users:
   nano ~/.zshrc
   ```

2. Add these lines:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

3. Save and reload:
   ```bash
   source ~/.bash_profile
   # or for zsh users:
   source ~/.zshrc
   ```

---

## 🚀 Step 3: Build Your Web App

In your project directory, run:

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

---

## 📲 Step 4: Initialize Capacitor Android Project

Run these commands one by one:

```bash
# Add Android platform
npx cap add android

# Sync your web app with Android project
npx cap sync
```

This creates an `android` folder in your project with native Android code.

---

## 🎨 Step 5: Customize App Icon & Splash Screen (Optional)

### App Icon:
1. Create your app icon (1024x1024 PNG)
2. Use Android Studio's Image Asset Studio:
   - Open Android Studio
   - Go to **File** → **New** → **Image Asset**
   - Select your icon image
   - It will generate all required sizes

### Splash Screen:
1. Place your splash screen image at:
   ```
   android/app/src/main/res/drawable/splash.png
   ```
2. The background color is already set to navy blue (#0f172a) in the config

---

## 🏗️ Step 6: Build the APK

### Method 1: Using Android Studio (Recommended)

1. Open Android Studio
2. Click **Open an Existing Project**
3. Navigate to your project and select the `android` folder
4. Wait for Gradle to sync (this may take a few minutes the first time)
5. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
6. Wait for the build to complete
7. Click **locate** in the popup to find your APK file

Your APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Method 2: Using Command Line

```bash
# Navigate to android folder
cd android

# Build debug APK
./gradlew assembleDebug

# Build release APK (for production)
./gradlew assembleRelease
```

**Debug APK location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**Release APK location:**
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

---

## 🔐 Step 7: Sign Your APK (For Production Release)

For publishing to Google Play Store, you need a signed release APK.

### Generate Keystore:

```bash
cd android/app
keytool -genkey -v -keystore liquidity-release-key.keystore -alias liquidity -keyalg RSA -keysize 2048 -validity 10000
```

Follow the prompts to create your keystore. **KEEP THIS FILE SAFE!**

### Configure Signing:

1. Create `android/key.properties`:
   ```properties
   storePassword=YOUR_STORE_PASSWORD
   keyPassword=YOUR_KEY_PASSWORD
   keyAlias=liquidity
   storeFile=liquidity-release-key.keystore
   ```

2. Edit `android/app/build.gradle`:
   
   Add before `android {`:
   ```gradle
   def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }
   ```

   Add inside `android {` block:
   ```gradle
   signingConfigs {
       release {
           keyAlias keystoreProperties['keyAlias']
           keyPassword keystoreProperties['keyPassword']
           storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
           storePassword keystoreProperties['storePassword']
       }
   }
   
   buildTypes {
       release {
           signingConfig signingConfigs.release
           minifyEnabled false
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
       }
   }
   ```

3. Build signed release APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

Your signed APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📱 Step 8: Test Your APK

### On Physical Device:
1. Enable Developer Options on your Android phone:
   - Go to **Settings** → **About Phone**
   - Tap **Build Number** 7 times
2. Enable **USB Debugging** in Developer Options
3. Connect phone to computer via USB
4. Transfer the APK file
5. Open the APK file on your phone to install

### On Emulator:
1. Open Android Studio
2. Go to **Tools** → **Device Manager**
3. Create a new virtual device
4. Start the emulator
5. Drag and drop your APK onto the emulator

---

## 🔄 Making Updates

When you make changes to your React app:

```bash
# 1. Build the web app
npm run build

# 2. Sync changes to Android
npx cap sync

# 3. Rebuild APK
cd android
./gradlew assembleDebug
```

Or use the shortcut:
```bash
npm run cap:build
```

---

## 📊 APK Size Optimization

To reduce APK size:

1. **Enable Proguard** in `android/app/build.gradle`:
   ```gradle
   buildTypes {
       release {
           minifyEnabled true
           shrinkResources true
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
       }
   }
   ```

2. **Build App Bundle** (AAB) for Play Store:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`

---

## 🚀 Publishing to Google Play Store

1. Create a Google Play Developer account ($25 one-time fee)
2. Go to https://play.google.com/console
3. Click **Create App**
4. Fill in app details:
   - **App Name:** Liquidity
   - **Package Name:** com.liquidity.loanapp
   - **Category:** Finance
5. Upload your **signed AAB file** (not APK)
6. Complete store listing:
   - App description
   - Screenshots (phone and tablet)
   - Feature graphic (1024 x 500)
   - App icon (512 x 512)
7. Submit for review

---

## 🎯 Important Configuration

Your app is configured as:
- **App ID:** `com.liquidity.loanapp`
- **App Name:** Liquidity
- **Theme Color:** Navy Blue (#0f172a)
- **Min Android Version:** Android 6.0 (API 23)

To change these, edit `/capacitor.config.ts`

---

## ⚡ Quick Reference Commands

```bash
# Build web app and sync to Android
npm run cap:build

# Open Android project in Android Studio
npm run cap:open

# Sync changes only
npm run cap:sync

# Build debug APK
cd android && ./gradlew assembleDebug

# Build release APK
cd android && ./gradlew assembleRelease

# Build App Bundle (for Play Store)
cd android && ./gradlew bundleRelease
```

---

## 🐛 Troubleshooting

### Issue: Gradle build failed
- Make sure ANDROID_HOME is set correctly
- Run `android/gradlew clean` then rebuild

### Issue: "SDK location not found"
- Create `android/local.properties`:
  ```
  sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
  ```

### Issue: App crashes on startup
- Check `android/app/build.gradle` minSdkVersion (should be 23+)
- Run `npx cap sync` again

### Issue: White screen in app
- Make sure `npm run build` completed successfully
- Check that `dist` folder exists and has files
- Run `npx cap copy` to copy web assets

---

## 📚 Additional Resources

- Capacitor Docs: https://capacitorjs.com/docs
- Android Developer Guide: https://developer.android.com/guide
- Google Play Console: https://play.google.com/console

---

## 🎉 Success!

You now have a native Android APK of your Liquidity loan app! 

Your users can install it directly on their Android devices or you can publish it to the Google Play Store.

For iOS version, you'll need a Mac with Xcode and follow similar steps with `npx cap add ios`.
