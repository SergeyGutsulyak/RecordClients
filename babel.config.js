module.exports = {
    presets: ['expo'],
    plugins: [
      // ...другие плагины
      'react-native-reanimated/plugin', // ← должен быть последним!
    ],
  };