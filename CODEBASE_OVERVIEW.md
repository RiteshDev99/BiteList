# BiteList - Codebase Plan and Overview Document

## 📋 Executive Summary

**BiteList** is a React Native mobile application for browsing and managing a food catalog. Users can explore food items by category, view detailed information, and manage their favorites list with persistent storage.

---

## 🏗️ Architecture Overview

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React Native 0.83.1 |
| **Language** | TypeScript 5.8.3 |
| **State Management** | Redux Toolkit 2.11.2 |
| **Navigation** | React Navigation 7.x (Bottom Tabs + Native Stack) |
| **HTTP Client** | Axios 1.13.4 |
| **Persistence** | AsyncStorage 2.2.0 |
| **Animations** | Lottie React Native 7.3.5 |
| **Icons** | react-native-vector-icons (MaterialIcons, MaterialCommunityIcons) |
| **Testing** | Jest 29.6.3 + React Native Testing Library |

### Project Structure

```
BiteList/
├── App.tsx                    # Root component with Redux Provider
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Generic UI primitives
│   │   │   ├── EmptyState.tsx
│   │   │   └── Loader.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── FoodCard.tsx
│   │   ├── RecommendedCard.tsx
│   │   └── TopBar.tsx
│   ├── navigations/           # Navigation configuration
│   │   ├── AppNavigator.tsx   # Root stack navigator
│   │   └── TabNavigator.tsx   # Bottom tab navigator
│   ├── screens/               # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── DetailsScreen.tsx
│   │   └── FavoritesScreen.tsx
│   ├── store/                 # Redux state management
│   │   ├── store.ts           # Store configuration
│   │   └── features/
│   │       └── foodCatalog/
│   │           ├── types.ts
│   │           ├── foodSlice.ts
│   │           ├── favoritesSlice.ts
│   │           ├── foodApi.ts
│   │           └── foodThunks.ts
│   ├── types/                 # TypeScript type definitions
│   │   └── navigation.ts
│   └── assets/                # Static assets
│       └── loader/
│           └── page.json      # Lottie animation
├── __tests__/                 # Test files
├── __mocks__/                 # Jest mocks
├── android/                   # Android native code
└── ios/                       # iOS native code
```

---

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         API Layer                                │
│                   (JSONBin.io REST API)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      foodApi.ts                                  │
│           fetchFoodsApi() / fetchCategoriesApi()                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     foodThunks.ts                                │
│      createAsyncThunk: fetchFoods / fetchCategories             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Redux Store                                │
│  ┌─────────────────────┐    ┌─────────────────────┐            │
│  │    foodCatalog      │    │     favorites       │            │
│  │  - foods[]          │    │  - items[]          │            │
│  │  - categories[]     │    │                     │            │
│  │  - status           │    │  (AsyncStorage      │            │
│  │  - category         │    │   persistence)      │            │
│  │  - page, hasMore    │    │                     │            │
│  └─────────────────────┘    └─────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     React Components                             │
│   useSelector() for reading │ useDispatch() for actions         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Navigation Structure

```
NavigationContainer
└── Stack.Navigator (AppNavigator)
    ├── "Main" → TabNavigator
    │   ├── "Home" → HomeScreen
    │   └── "Favorites" → FavoritesScreen
    └── "Details" → DetailsScreen
```

### Navigation Flow
- **HomeScreen**: Browse all foods, filter by category
- **DetailsScreen**: View food details, toggle favorites, see recommendations
- **FavoritesScreen**: View and manage saved favorites

---

## 🗃️ State Management

### Redux Slices

#### 1. `foodCatalog` (foodSlice.ts)
```typescript
interface FoodState {
  foods: FoodItem[];           // Current food items list
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  category: string;            // Selected category filter ('all' default)
  page: number;                // Pagination (prepared but not fully used)
  hasMore: boolean;            // More items available
  categories: string[];        // Available categories
}
```

**Actions:**
- `setCategory(category)` - Change category filter, reset foods

**Thunks:**
- `fetchFoods({ category, page })` - Fetch and filter foods
- `fetchCategories()` - Fetch unique categories from API

#### 2. `favorites` (favoritesSlice.ts)
```typescript
interface FavoritesState {
  items: FoodItem[];           // User's favorited items
}
```

**Actions:**
- `setFavorites(items)` - Bulk set favorites (for loading from storage)
- `toggleFavorite(item)` - Add/remove from favorites (auto-persists)

---

## 🧩 Component Reference

### Core Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `TopBar` | App header with logo, profile, search buttons | `onProfilePress`, `onSearchPress` |
| `CategoryTabs` | Horizontal scrollable category filter | None (uses Redux) |
| `FoodCard` | Food item card for lists | `item`, `hideImage`, `fullWidth`, `grid`, `onFavoriteToggle` |
| `RecommendedCard` | Compact card for recommendations | `item`, `onPress`, `width` |
| `EmptyState` | Empty list placeholder | `title`, `icon`, `actionText` |
| `Loader` | Lottie loading animation | `size`, `fullscreen`, `style` |

### Screen Components

| Screen | Description | Key Features |
|--------|-------------|--------------|
| `HomeScreen` | Main food listing | Category tabs, 2-column grid, loading state |
| `DetailsScreen` | Food detail view | Image header, favorite toggle, recommendations |
| `FavoritesScreen` | Saved items list | Single-column list, empty state, remove toggle |

---

## 🔌 API Integration

### Endpoint
- **Base URL**: `https://api.jsonbin.io/v3/b/698184b543b1c97be96155bf`
- **Method**: GET `/latest`

### Data Transformation
The API response is normalized in `foodApi.ts`:
```typescript
{
  id: item.id,
  name: item.title ?? item.name,
  image: item.thumbNailImage ?? item.mainImage ?? item.image,
  rating: item.rating,
  category: item.category,
  tags: item.tags,
  description: item.description ?? item.summary,
  price: item.price
}
```

---

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | `#00e05e` / `#2ECC71` | Active states, branding |
| Success Green | `#00C853` / `#4CAF50` | Price, ratings, badges |
| Dark Text | `#1a1a1a` / `#222` | Titles, headings |
| Muted Text | `#666` / `#999` | Secondary text |
| Background | `#FFFFFF` / `#fafafa` | Screen backgrounds |
| Card Shadow | `#000` @ 6-10% opacity | Elevation |

### Typography
- **Titles**: 20-28px, weight 700-800
- **Body**: 15-16px, weight 400-600
- **Captions**: 11-12px, weight 600

### Spacing
- Standard padding: 16-24px
- Card margins: 12px bottom
- Border radius: 12-28px (cards to sheets)

---

## 🧪 Testing Strategy

### Test Structure
```
__tests__/
├── App.test.tsx
├── test-utils.tsx          # Custom render with providers
├── components/
│   ├── ui/
│   │   ├── EmptyState.test.tsx
│   │   └── Loader.test.tsx
│   ├── CategoryTabs.test.tsx
│   ├── FoodCard.test.tsx
│   ├── RecommendedCard.test.tsx
│   └── TopBar.test.tsx
├── screens/
│   ├── HomeScreen.test.tsx
│   ├── DetailsScreen.test.tsx
│   └── FavoritesScreen.test.tsx
└── store/
    ├── store.test.ts
    ├── favoritesSlice.test.ts
    ├── foodApi.test.ts
    ├── foodSlice.test.ts
    └── foodThunks.test.ts
```

### Commands
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Generate coverage report
```

---

## 🚀 Development Workflow

### Available Scripts
```bash
npm start     # Start Metro bundler
npm run ios   # Run on iOS simulator
npm run android # Run on Android emulator
npm run lint  # ESLint check
npm test      # Run Jest tests
```

### iOS Setup
```bash
bundle install
bundle exec pod install
npm run ios
```

---

## 📈 Improvement Opportunities

### High Priority
1. **Search Functionality** - TopBar search button is wired but not implemented
2. **Profile Feature** - Profile button needs implementation
3. **Pagination** - Infrastructure exists but not fully utilized
4. **Error Handling** - Add user-friendly error states for API failures
5. **Pull-to-Refresh** - Add refresh capability to HomeScreen

### Medium Priority
1. **Type Safety** - Replace `any` types in components with proper interfaces
2. **Navigation Types** - Complete navigation param list typing
3. **Offline Support** - Cache food data for offline browsing
4. **Image Caching** - Add image caching for performance
5. **Skeleton Loaders** - Replace spinner with content skeletons

### Low Priority
1. **Dark Mode** - Add theme support
2. **Animations** - Add micro-interactions (card press, favorite toggle)
3. **Accessibility** - Add proper a11y labels
4. **Internationalization** - Add i18n support
5. **Analytics** - Add usage tracking

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript compiler options |
| `babel.config.js` | Babel transpilation config |
| `metro.config.js` | Metro bundler config |
| `jest.config.js` | Jest test configuration |
| `jest.setup.js` | Jest setup and mocks |
| `.eslintrc.js` | ESLint rules |
| `.prettierrc.js` | Prettier formatting rules |
| `app.json` | React Native app config |

---

## 📊 Dependencies Summary

### Production (14 packages)
- **Core**: react, react-native
- **Navigation**: @react-navigation/native-stack, @react-navigation/bottom-tabs
- **State**: @reduxjs/toolkit, react-redux
- **Storage**: @react-native-async-storage/async-storage
- **Networking**: axios
- **UI**: react-native-vector-icons, lottie-react-native, react-native-svg
- **Utilities**: react-native-safe-area-context, react-native-screens

### Development (20+ packages)
- **Build**: @babel/*, metro, typescript
- **Testing**: jest, @testing-library/react-native
- **Quality**: eslint, prettier
- **Types**: @types/*

---

## 🎯 Key Technical Decisions

1. **Redux Toolkit over Context** - Chosen for scalability and dev tools support
2. **JSONBin.io for API** - Simple hosted JSON for MVP/demo purposes
3. **Lottie for Animations** - Rich loading animations with minimal code
4. **AsyncStorage for Persistence** - Simple key-value storage for favorites
5. **React Navigation 7** - Latest navigation with native stack performance
6. **Jest + RTL** - Standard testing stack for React Native

---

*Document generated from codebase analysis. Last updated: Current session.*
