import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <MainButton title="Open Camera" onPress={() => setShowCamera(true)} />
        <MainButton title="Upload Image" onPress={handleImageUpload} />
      </View>
      <PhotoDisplay photoUri={photo} />
      <CameraModal
        visible={showCamera}
        onClose={() => setShowCamera(false)}
        onPhotoCapture={handlePhotoCapture}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
});
