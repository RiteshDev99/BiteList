module.exports = {
  createBottomTabNavigator: jest.fn(() => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
    Group: ({ children }) => children,
  })),
};
