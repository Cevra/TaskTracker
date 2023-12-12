/* eslint-disable no-undef */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'expo-router/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.ttf', 'svg', 'png', 'jpg', 'jpeg'],
          alias: {
            '@assets': ['./assets/*'],
            '~': ['./*'],
            '@': ['./app/*'],
          },
        },
      ],
    ],
  };
};
