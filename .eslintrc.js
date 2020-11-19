module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    amd: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb/hooks",
    "eslint:recommended",
    "google",
    "airbnb/hooks",
    "prettier",
    "prettier/babel",
    "prettier/standard"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  globals: {
    module: "readonly"
  },
  plugins: ["react", "markdown"],
  rules: {
    "require-jsdoc": "off",
    "react/prop-types": "off"
  }
};
