import path from 'path';
import fs from 'fs';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let copyRules = [];

// Check if the fonts directory exists before adding the copy rule
if (fs.existsSync('./src/fonts')) {
  copyRules.push({ from: './src/fonts', to: '../fonts' });
}

// Check if the assets directory exists before adding the copy rule
if (fs.existsSync('./src/assets')) {
  copyRules.push({ from: './src/assets', to: '../assets' });
}
const isDevelopment = process.env.NODE_ENV !== 'production';

export default {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'inline-source-map' : false,
  entry: './src/scripts/index.ts',
  output: {
    filename: 'bundled.scripts.js',
    path: path.resolve(__dirname, 'dist/scripts'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: copyRules,
    }),
    new MiniCssExtractPlugin({
      filename: '../styles/styles.css',
    }),
  ],
};
