# Mobile App

React Native app for an AI coaching product for managers: skill diagnosis (upload a 360/SELI report, take a survey, submit a recording, or run a roleplay), analysis of real conversations, roleplay with an AI persona (voice / video-avatar / chat), a 3-step debrief, and commitments carried back into real life.

> App name isn't finalized yet, so this README avoids naming the product.

Detailed technical docs (which libraries are installed, what each is for, the voice/avatar call architecture...) live in [docs/README.md](docs/README.md).

## Requirements

- Node `>= 22.11.0` (see `engines` in `package.json`)
- Ruby `>= 2.6.10` (CocoaPods via Bundler — see `Gemfile`)
- Xcode + CocoaPods (iOS build), Android Studio + JDK (Android build)
- Complete the [React Native — Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide for both platforms

## First-time setup

```sh
npm install

# iOS: install the Ruby gem (CocoaPods), then pod install
bundle install
cd ios && bundle exec pod install && cd ..

# Environment variables
cp .env.example .env   # then set API_URL to the AI Gateway you're targeting
```

`.env` is injected into code via `react-native-dotenv` (imported `from '@env'`, see `env.d.ts`) — don't commit the real `.env` file.

## Running the app

```sh
npm start          # Metro dev server

npm run android     # build & run on Android (builds only the connected device's architecture — --active-arch-only)
npm run ios         # build & run on iOS
```

After adding a native dependency or changing anything under `ios/`, re-run `cd ios && bundle exec pod install`.

## Checks

```sh
npm run lint
npm test
npx tsc --noEmit
```

## Project structure

```
src/
  components/        Components shared across screens (buttons, back header...)
  constant/          App-wide constants (local storage keys, defaults...)
  context/           AuthProvider (sign-in state, token), SettingProvider, ThemeProvider
  mock/              *.mock.ts — stand-in data for screens whose API isn't ready
  navigation/        Root stack + bottom tab navigator, route names in routes.ts
  providers/         Composes the app's providers (theme, auth...)
  screens/           Screens (Login, Home, DiagnosticGate, Notifications, Profile)
  services/          API calls (axios) — api.ts, auth.service.ts
  theme/             Design tokens (colors...)
  types/             *.type.ts — shared type definitions
  utils/             Utility functions (email validation...)
docs/                Technical docs — see docs/README.md
```

- Styling uses **NativeWind** (Tailwind for React Native) via `className=`, configured in `tailwind.config.js`.
- Navigation uses **React Navigation** (native-stack + bottom-tabs).

## Related docs

- [docs/README.md](docs/README.md) — index of technical docs (libraries, why each was chosen, which feature needs it).

## Troubleshooting

See React Native's [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page for generic build/run issues unrelated to this app's code.
