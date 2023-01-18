module.exports = {
  // parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {      
      // "configFile": "babel.config.js" //When linting it only works with absolute path
      // Here starts the configuration
        "presets": [
          "@babel/preset-env",
          "@babel/preset-react",
          "react-app"
        ]},
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ['react', 'react-hooks'],
  rules: {
    'prettier/prettier': 0,
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
}
