import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'iChat',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ShowSplashScreenSpinner: 'false',
      AutoHideSplashScreen: 'true',
      FadeSplashScreen: 'true',
      SplashScreenBackgroundColor: 'false',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'true',
      SplashScreen: 'splash',
      AndroidXEnabled: 'true',
      SplashScreenDelay: '300',
      'auto-hide-splash-screen': 'true'
    }
  }
};

export default config;
