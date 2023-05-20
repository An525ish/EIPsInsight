// const CompressionPlugin = require(‘compression-webpack-plugin’);

{
  resolve: {
  modules: [...],
  fallback: {
    "fs": false,
    "tls": false,
    "net": false,
    "path": false,
    "zlib": false,
    "http": false,
    "https": false,
    "stream": false,
    "url": require.resolve("url/"),
    "util": require.resolve("util/"),
    "assert": require.resolve("assert/"),
    "crypto-browserify": require.resolve('crypto-browserify'),
  } 
},
  entry: ["./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
    modules: [...],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "url": require.resolve("url"),
    } 
  },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "[name].[hash].js",
    publicPath: "/",
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index-prod.html",
    }),
    // new CompressionPlugin({
    //   test: /\.js(\?.*)?$/i,
    //   filename: "[path][query]",
    //   algorithm: "gzip",
    //   deleteOriginalAssets: false,
    // }),
    newCompressionPlugin(),
    new CompressionPlugin({
    filename: "[path][base].br",
    algorithm: "brotliCompress",
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
}