import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'DogWalker',
  webDir: 'www',
  plugins: {
    GoogleMaps: {
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }
  }
};

export default config;
