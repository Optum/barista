// https://jestjs.io/docs/en/configuration

module.exports = {
  ...{
    "moduleNameMapper": {
      "^@app(.*)$": "<rootDir>/src/app$1",
    }
  }, ...{
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": ["<rootDir>/setupJest.ts"]
  }
};
