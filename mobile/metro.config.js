const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');

const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const config = {
  watchFolders: [path.resolve(__dirname, '../')],
};
module.exports = wrapWithReanimatedMetroConfig(mergeConfig(getDefaultConfig(__dirname), config));
