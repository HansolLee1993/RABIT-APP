import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Camera, CameraDevice} from 'react-native-vision-camera';

interface CameraViewProps {
  camera: React.RefObject<Camera | null>;
  device: CameraDevice | undefined;
  onTakePicture: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  camera,
  device,
  onTakePicture,
}) => {
  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onTakePicture}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
