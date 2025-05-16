import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {MainButton} from '../components/MainButton';
import {PhotoDisplay} from '../components/PhotoDisplay';
import {CameraModal} from '../components/CameraModal';
import {uploadImage} from '../utils/uploadImage';
import {CarFormManager, type CarFormData} from '../utils/carFormManager';
import {ImageAnalyzer} from '../utils/imageAnalyzer';

export const MainScreen: React.FC = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CarFormData>(
    CarFormManager.resetForm(),
  );

  const handleImageUpload = async () => {
    console.log('handleImageUpload started');
    setIsUploading(true);
    setError(null);

    try {
      const result = await uploadImage();

      if (result.success && result.uri) {
        console.log('Upload successful, setting photo URI:', result.uri);
        setPhoto(result.uri);
        if (result.data) {
          if (CarFormManager.isEmptyResult(result.data)) {
            setError(
              "No match detected—but hey, maybe it's a concept car from the future? Try again",
            );
          } else {
            console.log(
              `Make: ${result.data.make}, Model: ${result.data.model}, Year: ${result.data.year}`,
            );
            setFormData(CarFormManager.createFormDataFromResult(result.data));
          }
        } else {
          setError(
            "No match detected—but hey, maybe it's a concept car from the future? Try again",
          );
        }
      } else {
        console.warn('Upload failed:', result.error);
        setError(
          "No match detected—but hey, maybe it's a concept car from the future? Try again",
        );
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(
        "No match detected—but hey, maybe it's a concept car from the future? Try again",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handlePhotoCapture = async (photoPath: string) => {
    setPhoto(photoPath);
    setShowCamera(false);
    setError(null);
    setIsUploading(true);

    try {
      const result = await ImageAnalyzer.analyze(photoPath);
      if (result.success && result.result) {
        setFormData(CarFormManager.createFormDataFromResult(result.result));
      } else {
        setError(result.error || 'An error occurred during analysis');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormChange = (field: keyof CarFormData, value: string) => {
    setFormData(currentData =>
      CarFormManager.updateField(currentData, field, value),
    );
  };

  const handleClear = () => {
    setPhoto(null);
    setError(null);
    setFormData(CarFormManager.resetForm());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandName}>RABIT</Text>
          </View>
          <View style={styles.buttonContainer}>
            <MainButton
              title="Open Camera"
              onPress={() => setShowCamera(true)}
              disabled={isUploading}
            />
            <MainButton
              title={isUploading ? 'Uploading...' : 'Upload Image'}
              onPress={handleImageUpload}
              disabled={isUploading}
            />
            {photo && (
              <MainButton
                title="Clear"
                onPress={handleClear}
                style={styles.clearButton}
                disabled={isUploading}
              />
            )}
          </View>
          {isUploading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2196F3" />
              <Text style={styles.loadingText}>Analyzing image...</Text>
            </View>
          )}
          <PhotoDisplay
            photoUri={photo}
            make={formData.make}
            model={formData.model}
            year={formData.year}
            error={error}
            onMakeChange={value => handleFormChange('make', value)}
            onModelChange={value => handleFormChange('model', value)}
            onYearChange={value => handleFormChange('year', value)}
            isLoading={isUploading}
          />
        </View>
        <CameraModal
          visible={showCamera}
          onClose={() => setShowCamera(false)}
          onPhotoCapture={handlePhotoCapture}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  brandContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 60 : 30,
    paddingBottom: 30,
    marginBottom: 20,
  },
  brandName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 6,
    textShadowColor: 'rgba(33,150,243,0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
    paddingHorizontal: 16,
    width: '100%',
  },
  clearButton: {
    backgroundColor: '#ff4444',
    minWidth: 100,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -75}, {translateY: -50}],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 10,
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
});
