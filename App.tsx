/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';
import {MainScreen} from './src/screens/MainScreen';
import {MainButton} from './src/components/MainButton';

function App(): React.JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <MainButton title="Grant Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MainScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
