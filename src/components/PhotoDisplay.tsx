import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

interface PhotoDisplayProps {
  photoUri: string | null;
}

export const PhotoDisplay: React.FC<PhotoDisplayProps> = ({photoUri}) => {
  if (!photoUri) return null;

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          source={{uri: `file://${photoUri}`}}
          style={styles.photoPreview}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>car model</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Color:</Text>
          <Text style={styles.value}>red</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>2025</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 60,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
});
