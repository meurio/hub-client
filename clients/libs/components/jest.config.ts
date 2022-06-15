module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  modulePathIgnorePatterns: ["./dist/", "./test/mocks.ts"],
  coveragePathIgnorePatterns: ["./test/mocks.ts"],
};
