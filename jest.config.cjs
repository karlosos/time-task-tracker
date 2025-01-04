/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // For React support
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript files
  },
  testEnvironment: "jest-environment-jsdom", // Browser-like environment for testing
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Optional: Global setup file
  globalSetup: "./global-setup.cjs",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore dist and node_modules
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy", // Mock CSS files
  },
};
