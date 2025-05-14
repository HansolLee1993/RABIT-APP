import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

interface PhotoDisplayProps {
  photoUri: string | null;
}

export const PhotoDisplay: React.FC<PhotoDisplayProps> = ({photoUri}) => {
  if (!photoUri) return null;

  return (
    <View style={styles.photoContainer}>
      <Image source={{uri: `file://${photoUri}`}} style={styles.photoPreview} />
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width: '90%',
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: 'white',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
