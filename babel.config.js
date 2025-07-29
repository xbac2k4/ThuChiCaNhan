module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          src: './src',
          tests: './tests/',
          '@assets': './src/assets',
          '@constants': './src/constants',
          '@services': './src/services',
          '@components': './src/components',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@workspaces': './src/workspaces',
          '@store': './src/store',
          '@common': './src/common',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
