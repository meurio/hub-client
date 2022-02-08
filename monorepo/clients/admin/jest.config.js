module.exports = {
  // The root of the source code, `<rootDir>` is a token Jest substitutes
  roots: ["<rootDir>/src/webpage"],

  // The test environment that will be used for testing, jsdom for browser environment
  testEnvironment: "jsdom",

  // Jest transformations -- this adds support for TypeScript using ts-jest
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  // Ignore cypress e2e test files
  testPathIgnorePatterns: ["<rootDir>/cypress/", "<rootDir>/src/webpage/components/__plugins__/content/components/editor-slate/slate-editor-example/"],

  // Code coverage config
  collectCoverageFrom: ["<rootDir>/src/webpage/**/*.{ts,tsx}"],
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/", "(.*).d.ts$", "(.*).min.tsx$", "<rootDir>/src/webpage/components/__plugins__/content/components/editor-slate/slate-editor-example/"],

  // Important: order matters, specific rules should be defined first
  // See : https://jestjs.io/fr/docs/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    ".+\\.(css|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "identity-obj-proxy", // Return proxies objects
    "^@/(.*)$": "<rootDir>/src/$1", // To resolve typescript path aliases
  },
};
