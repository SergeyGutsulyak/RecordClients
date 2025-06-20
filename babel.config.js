module.exports = {
    presets: ['expo'],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        { legacy: true } // ← важно для совместимости с WatermelonDB
      ],
      // ...другие плагины
      'react-native-reanimated/plugin', // ← должен быть последним!
    ],
  };