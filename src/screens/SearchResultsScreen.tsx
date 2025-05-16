// SearchResultsScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

interface CarResult {
  make: string;
  model: string;
  year: string | number;
  dealer: string;
  price: string;
  image_url: string;
}

const CarImage: React.FC<{imageUrl: string}> = ({imageUrl}) => {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <View style={styles.noImageContainer}>
        <Text style={styles.noImageText}>No Image Available</Text>
      </View>
    );
  }

  return (
    <Image
      source={{uri: imageUrl}}
      style={styles.carImage}
      resizeMode="cover"
      onError={() => setHasError(true)}
    />
  );
};

export const SearchResultsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract results and search criteria from route params
  const {results = [], searchCriteria = {}} = route.params || ({} as any);

  const renderSearchCriteriaSummary = () => {
    return (
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaTitle}>Search Criteria</Text>
        <Text style={styles.criteriaText}>
          {searchCriteria.make && `Make: ${searchCriteria.make}`}
          {searchCriteria.model && `, Model: ${searchCriteria.model}`}
          {searchCriteria.year && `, Year: ${searchCriteria.year}`}
        </Text>
      </View>
    );
  };

  // Handle case when no results are found
  if (!results || results.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search Results</Text>
          </View>

          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found</Text>
            <Text style={styles.emptySubText}>
              Try adjusting your search criteria
            </Text>
            <TouchableOpacity
              style={styles.newSearchButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.newSearchButtonText}>New Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search Results</Text>
        </View>

        <View style={styles.resultsContainer}>
          {renderSearchCriteriaSummary()}

          <Text style={styles.resultCount}>
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </Text>

          <FlatList
            data={results}
            renderItem={({item}: {item: CarResult}) => {
              if (!item) return null;
              return (
                <View style={styles.carItem}>
                  <CarImage imageUrl={item.image_url} />
                  <View style={styles.carInfo}>
                    <Text style={styles.carTitle}>
                      {item.year} {item.make} {item.model}
                    </Text>
                    <Text style={styles.carDealer}>Dealer: {item.dealer}</Text>
                    <Text style={styles.carPrice}>{item.price}</Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    paddingBottom: 16,
    minHeight: 60,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 40, // Offset for the back button width to ensure true center
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  criteriaContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  criteriaTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  criteriaText: {
    color: '#555',
  },
  resultCount: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  carItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: 180,
  },
  noImageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#777',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
  },
  carInfo: {
    padding: 16,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  carDealer: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4285F4',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  newSearchButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  newSearchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
