# React Playground

A monorepo for React and React Native experiments.

## Structure

```
react/           Web projects (Vite + React + TypeScript)
react-native/    Native projects (Expo + React Native)
```

Each folder has its own gallery. Add a new project by creating a subfolder with an `App.tsx` (web) or registering it in `react-native/src/projects/registry.ts`.

## React (web)

```bash
npm run dev:react
```

Open the gallery at `http://localhost:5173/`.

## React Native

```bash
npm run dev:react-native
```

Use Expo Go, a simulator, or `npm run web:native` for web.

## Projects

- **Color Guess** — pick the hex code that matches the color swatch (available in both `react/` and `react-native/`)
