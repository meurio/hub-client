module.exports = {
  verbose: true,
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "collectCoverage": true
};