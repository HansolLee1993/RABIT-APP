import React from 'react';
//import { API_URL } from '@env';
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
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface PhotoDisplayProps {
  photoUri: string | null;
  make: string;
  model: string;
  year: string;
  onMakeChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onYearChange: (value: string) => void;
  isLoading?: boolean;
}

export const PhotoDisplay: React.FC<PhotoDisplayProps> = ({
  photoUri,
  make,
  model,
  year,
  onMakeChange,
  onModelChange,
  onYearChange,
  isLoading = false,
}) => {
  const [isSearching, setIsSearching] = React.useState(false);
  const navigation = useNavigation();

  const handleSearch = async () => {
    try {
      setIsSearching(true);

      console.log('Searching with:', {model, make, year});

      const searchUrl = `http://10.0.2.2:3000/api/search?Model=${model}&Make=${make}&Year=${year}`;
      console.log('Search URL:', searchUrl);

      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Search results:', data);

      // Navigate to results screen with search results
      //@ts-ignore
      navigation.navigate('SearchResultsScreen', {
        results: Array.isArray(data) ? data : [data],
        searchCriteria: {
          model,
          make,
          year,
        },
      });
    } catch (error) {
      console.error('Error searching:', error);
      // Alert.alert(
      //   'Search Error',
      //   'There was a problem with your search. Please try again later.'
      // );
    } finally {
      setIsSearching(false);
    }
  };

  if (!photoUri) return null;

  // Handle the photo URI based on platform
  const imageUri = Platform.select({
    ios: photoUri,
    android: photoUri.startsWith('file://') ? photoUri : `file://${photoUri}`,
  });

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
              source={{uri: imageUri}}
              style={styles.photoPreview}
              resizeMode="contain"
            />
            {isLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Make:</Text>
            <TextInput
              style={styles.input}
              value={make}
              onChangeText={onMakeChange}
              placeholder="Enter car make"
              editable={!isLoading}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Model:</Text>
            <TextInput
              style={styles.input}
              value={model}
              onChangeText={onModelChange}
              placeholder="Enter car model"
              editable={!isLoading}
            />
          </View>
          <View style={styles.yearContainer}>
            <Text style={styles.label}>Year:</Text>
            <View style={styles.yearInputContainer}>
              <TextInput
                style={[styles.input, styles.yearInput]}
                value={year}
                onChangeText={onYearChange}
                placeholder="Enter release year"
                keyboardType="numeric"
                maxLength={4}
                editable={!isLoading}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.searchButton,
              (isLoading || isSearching) && styles.disabledButton,
            ]}
            onPress={handleSearch}
            disabled={isLoading || isSearching}>
            {isSearching ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
