module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      'react-native|' +
      '@react-native|' +
      'react-native-vector-icons|' +
      '@react-navigation|' +
      'lottie-react-native|' +
      'react-native-safe-area-context|' +
      'react-native-screens|' +
      '@react-native-async-storage|' +
      'react-redux|' +
      '@reduxjs/toolkit|' +
      'immer|' +
      'redux|' +
      'redux-thunk' +
    ')/)',
  ],
  moduleNameMapper: {
    '\\.json$': '<rootDir>/__mocks__/jsonMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
