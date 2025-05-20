import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Card, Surface, Text, Title } from 'react-native-paper';

const CountryCard = ({ country, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Surface style={styles.surface}>
        <Card style={styles.card} elevation={0}>
          <Image source={{ uri: country.flags.png }} style={styles.flag} />
          <Card.Content style={styles.content}>
            <Title style={styles.title}>{country.name.common}</Title>
            <Text style={styles.subtitle}>
              🏙️ Capitale : <Text style={styles.infoText}>{country.capital?.[0] || 'N/A'}</Text>
            </Text>
            <View style={styles.regionTag}>
              <Text style={styles.regionText}>{country.region}</Text>
            </View>
          </Card.Content>
        </Card>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  surface: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 20,
    elevation: 5,
    backgroundColor: '#fdfdfd',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  flag: {
    height: 180,
    width: '100%',
    resizeMode: 'cover',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  content: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  infoText: {
    fontWeight: '600',
    color: '#444',
  },
  regionTag: {
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 30,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  regionText: {
    color: '#00796b',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});

export default CountryCard;
