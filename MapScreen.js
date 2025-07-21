import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import save_search_listings from './JsonFiles/save_search_listings.json';

// Open in Google Maps
const openInGoogleMaps = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url).catch(err => console.error("Failed to open Google Maps", err));
};

const MapScreen = () => {
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // 👈 State to show details

  const locations = save_search_listings.filter(
    (item) => item.latitude && item.longitude
  );

  const handleLocationPress = (loc) => {
    setSelectedLocation(loc); // Show location detail
    mapRef.current?.animateToRegion(
      {
        latitude: parseFloat(loc.latitude),
        longitude: parseFloat(loc.longitude),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      1000
    );
  };

  return (
    <View style={styles.container3}>
      <Text style={styles.mapTitle}>Map</Text>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(locations[0].latitude),
          longitude: parseFloat(locations[0].longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: parseFloat(loc.latitude),
              longitude: parseFloat(loc.longitude),
            }}
            title={loc.name}
            description={loc.address}
            onPress={() => handleLocationPress(loc)} // 👈 Marker press
          />
        ))}
      </MapView>

      {selectedLocation && (
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>{selectedLocation.name}</Text>
          <Text style={styles.detailText}>{selectedLocation.address}</Text>
          <Text style={styles.detailText}>Phone: {selectedLocation.display_phone}</Text>
          <Text style={styles.detailText}>Rating: {selectedLocation.rating} ⭐</Text>
          <TouchableOpacity
            onPress={() => openInGoogleMaps(selectedLocation.latitude, selectedLocation.longitude)}
          >
            <Text style={styles.linkText}>Open in Google Maps</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.list}>
        <Text style={styles.listTitle}>Marked Locations:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.scrollRow}>
            {locations.map((loc) => (
              <TouchableOpacity
                key={loc.id}
                style={styles.locationItem}
                onPress={() => handleLocationPress(loc)}
              >
                <Text style={styles.locationTitle}>{loc.name}</Text>
                <Text style={styles.locationDesc}>{loc.address}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  mapTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  map: {
    height: 500,
    width: '100%',
    borderRadius: 10,
  },
  list: {
    marginTop: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  scrollRow: {
    flexDirection: 'row',
    gap: 10,
  },
  locationItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(141, 138, 138)',
    width: 200,
    marginRight: 10,
  },
  locationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationDesc: {
    color: '#555',
    fontSize: 14,
  },
  detailCard: {
    position: 'absolute',
    top: 90,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
  },
  linkText: {
    color: '#007BFF',
    marginTop: 10,
    fontWeight: '600',
  },
});
