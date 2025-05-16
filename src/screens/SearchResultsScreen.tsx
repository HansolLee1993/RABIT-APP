// SearchResultsScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

export const SearchResultsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extract results and search criteria from route params
  const {results = [], searchCriteria = {}} = route.params || ({} as any);

  // Handle case when no results are found
  if (!results || results.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  }

  // Render search criteria summary
  const renderSearchCriteriaSummary = () => {
    const criteria = [];

    if (searchCriteria.make) criteria.push(`Make: ${searchCriteria.make}`);
    if (searchCriteria.model) criteria.push(`Model: ${searchCriteria.model}`);
    if (searchCriteria.year) criteria.push(`Year: ${searchCriteria.year}`);

    if (criteria.length === 0) return null;

    return (
      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaTitle}>Search Criteria:</Text>
        <Text style={styles.criteriaText}>{criteria.join(', ')}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
          renderItem={({item}) => {
            if (!item) return null;
            return (
              <View style={styles.carItem}>
                {item.imageUrl ? (
                  <Image
                    source={{uri: item.imageUrl}}
                    style={styles.carImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.noImageContainer}>
                    <Text style={styles.noImageText}>No Image</Text>
                  </View>
                )}
                <View style={styles.carInfo}>
                  <Text style={styles.carTitle}>
                    {item.year ?? ''} {item.make ?? ''} {item.model ?? ''}
                  </Text>
                </View>
              </View>
            );
          }}
          // keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
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
  },
  carInfo: {
    padding: 16,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  newSearchButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  newSearchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
