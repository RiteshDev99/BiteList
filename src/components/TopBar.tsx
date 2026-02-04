import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TopBarProps {
  onProfilePress?: () => void;
  onSearchPress?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onProfilePress, onSearchPress }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#000000" />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={onProfilePress}
            activeOpacity={0.7}
            style={styles.profileButton}
          >
            <View style={styles.avatar}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>
            <Text style={styles.titleBite}>Bite</Text>
            <Text style={styles.titleList}>List</Text>
          </Text>

          <TouchableOpacity
            onPress={onSearchPress}
            activeOpacity={0.7}
            style={styles.searchButton}
          >
            <View style={styles.searchIcon}>
              <View style={styles.searchCircle} />
              <View style={styles.searchHandle} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: 60,
  },
  profileButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    backgroundColor: '#FFD4A3',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarHead: {
    width: 14,
    height: 14,
    backgroundColor: '#6B4E3D',
    borderRadius: 7,
    position: 'absolute',
    top: 8,
  },
  avatarBody: {
    width: 20,
    height: 13,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  titleBite: {
    color: '#2ECC71',
    fontStyle: 'italic',
  },
  titleList: {
    color: '#2ECC71',
    fontStyle: 'italic',
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#E8F8F0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchCircle: {
    width: 16,
    height: 16,
    borderWidth: 2.5,
    borderColor: '#2ECC71',
    borderRadius: 8,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  searchHandle: {
    width: 7,
    height: 2.5,
    backgroundColor: '#2ECC71',
    borderRadius: 2,
    position: 'absolute',
    bottom: 3,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },
});

export default TopBar;
