import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {MainButton} from '../components/MainButton';
import {PhotoDisplay} from '../components/PhotoDisplay';
import {CameraModal} from '../components/CameraModal';
import {launchImageLibrary} from 'react-native-image-picker';

export const MainScreen: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.assets && response.assets[0]?.uri) {
          setPhoto(response.assets[0].uri);
        }
      },
    );
  };

  const handlePhotoCapture = (photoPath: string) => {
    setPhoto(photoPath);
    setShowCamera(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandName}>RABIT</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton
              title="Open Camera"
              onPress={() => setShowCamera(true)}
            />
            <MainButton title="Upload Image" onPress={handleImageUpload} />
          </View>
          <PhotoDisplay photoUri={photo} />
        </View>
        <CameraModal
          visible={showCamera}
          onClose={() => setShowCamera(false)}
          onPhotoCapture={handlePhotoCapture}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  brandContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 60 : 30,
    paddingBottom: 30,
    marginBottom: 20,
  },
  brandName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 6,
    textShadowColor: 'rgba(33,150,243,0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 30,
    paddingHorizontal: 30,
    width: '100%',
  },
});
