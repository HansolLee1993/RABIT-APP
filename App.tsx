/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, Modal, Text} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {launchImageLibrary} from 'react-native-image-picker';
import {CameraView} from './src/components/CameraView';
import {PhotoPreview} from './src/components/PhotoPreview';
import {MainButton} from './src/components/MainButton';

function App(): React.JSX.Element {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const takePicture = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto();
        setPhoto(photo.path);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const handleClose = () => {
    setShowCamera(false);
    setPhoto(null);
  };

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.assets && response.assets[0]?.uri) {
          setPhoto(response.assets[0].uri);
          setShowCamera(true);
        }
      },
    );
  };

  // Request permission if not granted
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Camera permission is required to use this app
        </Text>
        <MainButton title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  // Show error if no camera device is found
  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>No camera device found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Page */}
      <View style={styles.mainPage}>
        <View style={styles.buttonContainer}>
          <MainButton title="Open Camera" onPress={() => setShowCamera(true)} />
          <MainButton title="Upload Image" onPress={handleImageUpload} />
        </View>
      </View>

      {/* Camera Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={showCamera}
        onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          {photo ? (
            <PhotoPreview
              photoPath={photo}
              onClose={handleClose}
              onRetake={() => setPhoto(null)}
            />
          ) : (
            <CameraView
              camera={camera}
              device={device}
              onTakePicture={takePicture}
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  permissionText: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
  },
});

export default App;
