module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      // ...другие плагины
      'react-native-worklets/plugin', // ← должен быть последним!
    ],
  };