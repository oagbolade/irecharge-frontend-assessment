module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // This should point to the jest.setup.js file
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // For transforming JS/TS files
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // For aliasing imports
  },
};
