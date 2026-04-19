# Build APK with GitHub Actions (Free & Cloud-Based) ✅

This guide explains how to build your **Liquidity loan app** APK using GitHub Actions for **FREE**, without installing Android Studio locally.

---

## ✅ Setup Complete!

Your project is **ready to go**! I've already set up:
- ✅ GitHub Actions workflow (`.github/workflows/build-android.yml`)
- ✅ Android platform (`android/` directory)
- ✅ Build configuration (`index.html`, `src/main.tsx`, `vite.config.ts`)
- ✅ Capacitor config (`capacitor.config.ts`)

---

## 📋 Quick Start (3 Steps)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit everything
git commit -m "Add Liquidity loan app with GitHub Actions"

# Create a new repository on GitHub (https://github.com/new), then:
git remote add origin https://github.com/YOUR_USERNAME/liquidity-app.git
git branch -M main
git push -u origin main
```

### Step 2: Trigger the Build

The workflow runs automatically when you push to `main`. Or trigger manually:

1. Go to **https://github.com/YOUR_USERNAME/liquidity-app/actions**
2. Click **"Build Android APK"** workflow
3. Click **"Run workflow"** → **"Run workflow"**

### Step 3: Download Your APK

1. Wait 3-5 minutes for build to complete ⏱️
2. Click the completed workflow run (green checkmark ✅)
3. Scroll to **"Artifacts"** section at the bottom
4. Download **"liquidity-app-debug"** (your APK will be inside the zip)

---

## 📱 Install APK on Your Phone

1. **Transfer the APK** to your Android device
2. **Enable "Install unknown apps"** in Settings → Security
3. **Open the APK file** and install
4. Launch **Liquidity** app! 🎉

---

## 🔧 What the GitHub Actions Workflow Does

The workflow (`.github/workflows/build-android.yml`) automatically:

1. ✅ Sets up Node.js 20 + pnpm
2. ✅ Sets up Java 17 + Android SDK
3. ✅ Installs dependencies (`pnpm install`)
4. ✅ Builds React web app (`pnpm run build`)
5. ✅ Syncs with Capacitor (`pnpm run cap:sync`)
6. ✅ Compiles Android APK (`./gradlew assembleDebug`)
7. ✅ Uploads APK as downloadable artifact

**Total time**: ~3-5 minutes  
**Cost**: FREE! 🎉

---

## 💰 GitHub Actions Free Tier

- **Public repos**: Unlimited free builds ♾️
- **Private repos**: 2,000 minutes/month (that's ~400-600 builds!)
- **Storage**: 500 MB for artifacts (plenty for APKs)

---

## 🚀 Build Types

### Debug APK (Current Setup)
- ✅ Perfect for testing
- ✅ Quick to build
- ❌ Larger file size (~50-100 MB)
- ❌ Not optimized for production
- ❌ Cannot publish to Google Play Store

### Release APK (Production)

To build a **signed release APK** for Google Play Store:

1. **Generate a keystore** (one-time setup):
```bash
keytool -genkey -v -keystore liquidity-release.keystore -alias liquidity -keyalg RSA -keysize 2048 -validity 10000
```

2. **Add GitHub Secrets**:
   - Go to Settings → Secrets → Actions
   - Add these secrets:
     - `KEYSTORE_FILE` (base64 of your .keystore file)
     - `KEYSTORE_PASSWORD`
     - `KEY_ALIAS`
     - `KEY_PASSWORD`

3. **Update workflow** to use release build (I can help with this!)

---

## 🛠️ Local Development

While GitHub Actions builds your APK in the cloud, you can still:

```bash
# Build web app locally
pnpm run build

# Sync to Android
pnpm run cap:sync

# Build APK locally (requires Android SDK)
cd android && ./gradlew assembleDebug
```

---

## 🐛 Troubleshooting

### "Build failed on cap:sync"
- ✅ Already fixed! The `android/` directory is included.
- Make sure you committed and pushed the `android/` folder.

### "Build failed on gradlew"
- ✅ Already fixed! The workflow auto-grants execute permissions.

### "APK not in artifacts"
- Check the workflow logs for errors
- Ensure build completed successfully (green ✅)

### "Can't install APK on phone"
- Enable "Install from unknown sources" in Settings
- Make sure APK downloaded completely (not corrupted)

### "App crashes on launch"
- Check Logcat for errors
- Test the web version first (`pnpm run dev`)

---

## 📝 Next Steps

1. **Test the APK** on your Android device
2. **Update app icon** (add icons to `android/app/src/main/res/`)
3. **Configure splash screen** (already set in `capacitor.config.ts`)
4. **Set up release signing** (for Google Play Store)
5. **Add versioning** (bump version in `package.json` and Android)

---

## 🎯 Advanced: Auto-Release on Git Tag

Want to auto-create GitHub releases with APKs? Add this to your workflow:

```yaml
- name: Create Release
  if: startsWith(github.ref, 'refs/tags/')
  uses: softprops/action-gh-release@v1
  with:
    files: android/app/build/outputs/apk/debug/app-debug.apk
    name: Liquidity v${{ github.ref_name }}
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Then:
```bash
git tag v1.0.0
git push origin v1.0.0
```

Your APK will automatically attach to the release! 🚀

---

## 📞 Need Help?

- **Workflow logs**: Check GitHub Actions logs for detailed errors
- **Build locally**: Run `pnpm run build && pnpm run cap:sync` to test
- **Capacitor docs**: https://capacitorjs.com/docs

---

**You're all set!** Just push to GitHub and watch the magic happen. 🎉
