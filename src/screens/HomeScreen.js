import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      const data = await fetchAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Error loading countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const renderCountry = ({ item }) => (
    <CountryCard
      country={item}
      onPress={() => navigation.navigate('CountryDetails', { country: item })}
    />
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search countries..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={{ fontSize: 16 }}
        iconColor="#1976d2"
        placeholderTextColor="#aaa"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1976d2" style={styles.loading} />
      ) : filteredCountries.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No countries found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCountries}
          renderItem={renderCountry}
          keyExtractor={(item) => item.cca3}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3f7',
  },
  searchBar: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: 'white',
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  loading: {
    marginTop: 32,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
