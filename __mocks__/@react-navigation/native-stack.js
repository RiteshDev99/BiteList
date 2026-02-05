module.exports = {
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
    Group: ({ children }) => children,
  })),
};
