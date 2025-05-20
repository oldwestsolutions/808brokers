module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
  };

  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
}; 