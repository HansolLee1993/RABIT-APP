import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
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
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cameraContainer}>
          <CameraView
            camera={camera}
            device={device}
            onTakePicture={handleTakePicture}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: Dimensions.get('window').height * 0.75,
    marginTop: 150,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
