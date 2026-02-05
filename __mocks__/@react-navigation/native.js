const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getParent: jest.fn(() => mockNavigation),
  getState: jest.fn(() => ({})),
  addListener: jest.fn(() => jest.fn()),
  removeListener: jest.fn(),
};

const mockRoute = {
  key: 'test-key',
  name: 'TestScreen',
  params: {},
};

module.exports = {
  useNavigation: jest.fn(() => mockNavigation),
  useRoute: jest.fn(() => mockRoute),
  useIsFocused: jest.fn(() => true),
  useFocusEffect: jest.fn(),
  useNavigationState: jest.fn(),
  NavigationContainer: ({ children }) => children,
  createNavigationContainerRef: jest.fn(() => ({
    current: mockNavigation,
  })),
  CommonActions: {
    navigate: jest.fn(),
    reset: jest.fn(),
    goBack: jest.fn(),
    setParams: jest.fn(),
  },
  StackActions: {
    push: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    replace: jest.fn(),
  },
  TabActions: {
    jumpTo: jest.fn(),
  },
  DrawerActions: {
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
  },
};
