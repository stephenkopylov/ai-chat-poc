const {
    override,
    addWebpackAlias,
    removeModuleScopePlugin,
    addExternalBabelPlugin,
    addWebpackPlugin
} = require('customize-cra');
const path = require('path');
const {DefinePlugin} = require('webpack');

const overridePath = (webpackConfig) => {
    if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
    }
    removeModuleScopePlugin()(webpackConfig);
    addExternalBabelPlugin()(webpackConfig);

    const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
    if (oneOfRule) {
        const tsxRule = oneOfRule.oneOf.find(
            (rule) => rule.test && rule.test.toString().includes('tsx')
        );

        const newIncludePaths = [
            // relative path to my yarn workspace library
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../node_modules'),
        ];
        if (tsxRule) {
            if (Array.isArray(tsxRule.include)) {
                tsxRule.include = [...tsxRule.include, ...newIncludePaths];
            } else {
                tsxRule.include = [tsxRule.include, ...newIncludePaths];
            }
        }
    }
    return webpackConfig;
};

module.exports = override(
    // this is for path alais
    addWebpackAlias({
        api: path.resolve(__dirname, 'src/api'),
        utils: path.resolve(__dirname, 'src/utils'),
    }),
    addWebpackPlugin(
        new DefinePlugin({
            __DEV__: process.env.NODE_ENV !== 'production',
        }),
    ),
    overridePath
);
