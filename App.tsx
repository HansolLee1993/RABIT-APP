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
import {SearchResultsScreen} from './src/screens/SearchResultsScreen';
import {MainButton} from './src/components/MainButton';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function App(): React.JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const Stack = createNativeStackNavigator();

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <MainButton title="Grant Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          id={undefined}
          initialRouteName="MainScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen
            name="SearchResultsScreen"
            component={SearchResultsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
