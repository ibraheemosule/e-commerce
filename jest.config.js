/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  // transform: {
  //   "\\.[jt]sx?$": [
  //     "ts-jest",
  //     {
  //       tsconfig: "./tsconfig.jest.json",
  //     },
  //   ],
  // },
  setupFilesAfterEnv: ["./src/jest.setup.ts"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: -10,
    },
  },
  moduleNameMapper: {
    "@next/font/(.*)": require.resolve(
      "next/dist/build/jest/__mocks__/nextFontMock.js"
    ),
  },
};
