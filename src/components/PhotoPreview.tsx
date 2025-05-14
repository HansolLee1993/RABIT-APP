import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';

interface PhotoPreviewProps {
  photoPath: string;
  onClose: () => void;
  onRetake: () => void;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  photoPath,
  onClose,
  onRetake,
}) => {
  return (
    <View style={styles.preview}>
      <Image source={{uri: `file://${photoPath}`}} style={styles.photo} />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onRetake}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  photo: {
    width: '100%',
    height: '80%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,
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
