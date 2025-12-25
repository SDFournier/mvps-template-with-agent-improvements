module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "^@repo/shared$": "<rootDir>/../../packages/shared/src/index.ts"
  }
};
