module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
  setupTestFrameworkScriptFile: "<rootDir>/test/setupTests.js",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  },
  coverageDirectory: "./coverage/",
  collectCoverage: true
};
