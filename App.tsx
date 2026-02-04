import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}
        edges={['top', 'bottom']}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 24, color: '#000' }}>
            Light Mode + Safe Area 🌞
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
