import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';

interface PhotoDisplayProps {
  photoUri: string | null;
}

export const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ photoUri }) => {
  const [model, setModel] = useState('');
  const [make, setMake] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSearch = async () => {

    try {
      setIsLoading(true);

      console.log('Searching with:', { model, make, year});

      // Make API call
      const response = await fetch(`http://localhost:3002/search?model=${model}&make=${make}&year=${year}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Search results:', data);
      // Navigate to results screen with search results
      //@ts-ignore
      navigation.navigate('SearchResultsScreen', {
        results: data,
        searchCriteria: {
          model,
          make,
          year,
        }
      });
    } catch (error) {
      console.error('Error searching:', error);
      // Alert.alert(
      //   'Search Error',
      //   'There was a problem with your search. Please try again later.'
      // );
    } finally {
      setIsLoading(false);
    }
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
              source={{ uri: `file://${photoUri}` }}
              style={styles.photoPreview}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Make:</Text>
            <TextInput
              style={styles.input}
              value={make}
              onChangeText={setMake}
              placeholder="Enter car make"
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
          <View style={styles.yearContainer}>
            <Text style={styles.label}>Year:</Text>
            <View style={styles.yearInputContainer}>
              <TextInput
                style={[styles.input, styles.yearInput]}
                value={year}
                onChangeText={setYear}
                placeholder="Enter release year"
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={isLoading}>
            {isLoading ? (
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
