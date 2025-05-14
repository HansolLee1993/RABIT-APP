import React, {useRef} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {CameraView} from './CameraView';

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
  onPhotoCapture: (photoPath: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  visible,
  onClose,
  onPhotoCapture,
}) => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const handleTakePicture = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto();
        onPhotoCapture(photo.path);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  if (!device) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <CameraView
          camera={camera}
          device={device}
          onTakePicture={handleTakePicture}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
