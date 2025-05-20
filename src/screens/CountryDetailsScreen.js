import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { Surface, Text, Title, Card, Divider } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

const CountryDetailsScreen = ({ route }) => {
  const { country } = route.params;

  const getLanguages = () => {
    return Object.values(country.languages || {}).join(', ');
  };

  const getCurrencies = () => {
    return Object.values(country.currencies || {})
      .map(curr => `${curr.name} (${curr.symbol})`)
      .join(', ');
  };

  return (
    <ScrollView style={styles.container} bounces={true}>
      {/* Drapeau */}
      <Card style={styles.heroCard}>
        <Card.Cover source={{ uri: country.flags.png }} style={styles.flag} />
      </Card>

      {/* Infos principales */}
      <Surface style={styles.infoContainer}>
        <Title style={styles.countryName}>{country.name.common}</Title>
        <Text style={styles.officialName}>{country.name.official}</Text>

        <View style={styles.statsContainer}>
          <InfoItem title="🏙️ Capital" value={country.capital?.[0] || 'N/A'} />
          <InfoItem title="👥 Population" value={country.population.toLocaleString()} />
          <InfoItem title="🌍 Region" value={country.region} />
          <InfoItem title="📍 Subregion" value={country.subregion || 'N/A'} />
          <InfoItem title="🗣️ Languages" value={getLanguages()} />
          <InfoItem title="💰 Currencies" value={getCurrencies()} />
        </View>

        <Divider style={styles.divider} />

        {/* Carte */}
        <Title style={styles.mapTitle}>📌 Location</Title>
        <Card style={styles.mapCard}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: country.latlng[0],
              longitude: country.latlng[1],
              latitudeDelta: 30,
              longitudeDelta: 30,
            }}
          >
            <Marker
              coordinate={{
                latitude: country.latlng[0],
                longitude: country.latlng[1],
              }}
              title={country.name.common}
            />
          </MapView>
        </Card>
      </Surface>
    </ScrollView>
  );
};

const InfoItem = ({ title, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  heroCard: {
    elevation: 0,
  },
  flag: {
    height: 220,
    resizeMode: 'cover',
  },
  infoContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
  },
  countryName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  officialName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#7f8c8d',
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
  },
  infoValue: {
    fontSize: 15,
    color: '#555',
    marginTop: 2,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#ccc',
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2c3e50',
  },
  mapCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 300,
  },
});

export default CountryDetailsScreen;
