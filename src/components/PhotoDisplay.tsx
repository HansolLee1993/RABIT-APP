import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface PhotoDisplayProps {
  photoUri: string | null;
}

export const PhotoDisplay: React.FC<PhotoDisplayProps> = ({photoUri}) => {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching with:', {model, color, yearFrom, yearTo});
  };

  if (!photoUri) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <Image
              source={{uri: `file://${photoUri}`}}
              style={styles.photoPreview}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Model:</Text>
            <TextInput
              style={styles.input}
              value={model}
              onChangeText={setModel}
              placeholder="Enter car model"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Color:</Text>
            <TextInput
              style={styles.input}
              value={color}
              onChangeText={setColor}
              placeholder="Enter car color"
            />
          </View>
          <View style={styles.yearContainer}>
            <Text style={styles.label}>Year:</Text>
            <View style={styles.yearInputContainer}>
              <TextInput
                style={[styles.input, styles.yearInput]}
                value={yearFrom}
                onChangeText={setYearFrom}
                placeholder="From"
                keyboardType="numeric"
                maxLength={4}
              />
              <Text style={styles.yearSeparator}>-</Text>
              <TextInput
                style={[styles.input, styles.yearInput]}
                value={yearTo}
                onChangeText={setYearTo}
                placeholder="To"
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  photoContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  yearContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  yearInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#666',
  },
  yearSeparator: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#666',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 60,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  searchButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
