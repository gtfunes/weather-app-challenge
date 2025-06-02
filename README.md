# weather-app-challenge

Weather app for coding challenge. Made using `@react-native-community/cli init` preset.

Sadly, due to some issues related to the Gluestack UI library and Jest, I was not able to make tests work correctly: [#1475](https://github.com/gluestack/gluestack-ui/issues/1475).

## Setup

First install dependencies: `npm i`. Then copy `.env.example` to `.env` and enter your OpenWeatherMap API key.

## Commands

You can run the app using `npm run ios` or `npm run android`.

## Libraries used

### Core Framework

- **[React Native](https://reactnative.dev/)** – Cross-platform mobile app development framework
- **[TypeScript](https://www.typescriptlang.org/)** – Static typing for safer, scalable code

### State Management

- **[@reduxjs/toolkit](https://redux-toolkit.js.org/)** – Simplified Redux logic and async support
- **[react-redux](https://react-redux.js.org/)** – React bindings for Redux

### UI & Design System

- **[Gluestack UI](https://ui.gluestack.io/)** – A headless component library for React Native and web, offering a customizable design system with built-in support for theming, accessibility, responsive styles, and utility props (formerly NativeBase)

### Navigation

- **[@react-navigation/native](https://reactnavigation.org/)** – Navigation container for RN apps
- **[@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/)** – Native stack navigator

### API & Async

- **[axios](https://axios-http.com/)** – Promise-based HTTP client for API calls

### Environment Variable Management

- **[react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)** – Securely load API keys and secrets from `.env` file
