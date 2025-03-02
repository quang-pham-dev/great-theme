# Great Theme - React Native Expo App

## Overview

Great Theme is a modern, feature-rich React Native application built with Expo, designed to provide a seamless and engaging mobile experience. The app showcases a comprehensive theming system, internationalization support, and follows best practices in React Native development.

## Key Features

- 🎨 Dynamic theming system with light/dark mode support
- 🌐 Internationalization (i18n) with multiple language support
- 📱 Modern UI components with haptic feedback
- 🔐 Secure authentication system
- 🎯 File-based routing using Expo Router
- 📦 State management with React Query
- 🎬 Media support (images, video player)
- 📲 Push notifications
- 🔄 Bottom sheets and modals
- 📝 Form handling with validation

## Tech Stack

- [Expo](https://expo.dev) - Development platform
- [React Native](https://reactnative.dev) - Core framework
- [TypeScript](https://www.typescriptlang.org) - Programming language
- [Expo Router](https://docs.expo.dev/router/introduction) - Navigation
- [React Query](https://tanstack.com/query/latest) - Data fetching
- [React Hook Form](https://react-hook-form.com) - Form management
- [i18next](https://www.i18next.com) - Internationalization
- [Zod](https://zod.dev) - Schema validation

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- bun or yarn
- iOS Simulator / Android Emulator for mobile development
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

### Installation

1. Clone the repository

```bash
git clone git@github.com:quang-pham-dev/great-theme.git
cd great-theme
```

2. Install dependencies

```bash
bun install
```

3. Start the development server

```bash
bun start
```

### Available Scripts

- `bun start` - Start the Expo development server
- `bun run ios` - Run on iOS simulator
- `bun run android` - Run on Android emulator
- `bun run web` - Run on web browser
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix ESLint issues
- `bun run format` - Format code with Prettier

## Project Structure

```
great-theme/
├── app/                    # Application screens and navigation
├── assets/                 # Static assets (images, fonts)
├── components/             # Reusable UI components
├── config/                 # App configuration
├── constants/              # Constants and static data
├── contexts/               # React contexts
├── hooks/                  # Custom React hooks
├── i18n/                   # Internationalization
├── interfaces/             # TypeScript interfaces
├── services/               # API services
├── theme/                  # Theming system
└── utils/                  # Utility functions
```

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### Theming

The app uses a custom theming system that supports:
- Light and dark modes
- Custom color schemes
- Responsive typography
- Consistent spacing

### Internationalization

Add new translations in `i18n/locales/` following the existing structure:
```typescript
export const en = {
  common: {
    // translations
  }
};
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using [Expo](https://expo.dev)
