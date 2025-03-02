const path = require('node:path')

const dotenv = require('dotenv')

const pkg = require('./package.json')

const env = process.env.ENV || 'development'
const envPath = env === 'development' ? '.env' : `.env.${env}`
const envConfig = dotenv.config({
  path: path.resolve(process.cwd(), envPath),
}).parsed

const VERSION = pkg.version
const PROJECT_NAME = 'great-theme'

const defaultConfig = {
  name: PROJECT_NAME,
  slug: PROJECT_NAME,
  version: VERSION,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'judi',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.quangpham.dev.judi',
    associatedDomains: ['applinks:quangpham.dev'],
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      UIBackgroundModes: ['remote-notification'],
      NSCameraUsageDescription:
        'Used for profile pictures, posts, and other kinds of content.',
      NSPhotoLibraryAddUsageDescription: 'Used to save images to your library.',
      NSPhotoLibraryUsageDescription:
        'Used for profile pictures, posts, and other kinds of content',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: ['NOTIFICATIONS'],
    package: 'com.quangpham.dev.judi',
    googleServicesFile: './google-services.json',
    intentFilters: [
      {
        action: 'VIEW',
        autoVerify: true,
        data: [
          {
            scheme: 'https',
            host: 'https://quangpham.dev',
            pathPrefix: '/',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/images/notification-icon.png',
        color: '#1185fe',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    ...envConfig,
    router: {
      origin: false,
    },
    eas: {
      projectId: '21994ab8-ae44-44f0-a4b8-7913ee0da0ae',
    },
  },
  owner: 'quangphamngoc',
}

export default () => {
  return defaultConfig
}
