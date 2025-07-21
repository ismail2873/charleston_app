import { Text, View, Image, TextInput, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import ReadMoreText from './ReadmoreText.js';
import { useNavigation } from '@react-navigation/native';
import save_search_listings from './JsonFiles/save_search_listings.json';


function HomeScreen() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCity, setSelectedCity] = useState('All cities');
  const [selectedCuisine, setSelectedCuisine] = useState('Select Cuisine');
  const [isPressed, setIsPressed] = useState(false);
  const navigation = useNavigation();

  const cities = ['All cities', 'Charleston', 'North Charleston', 'Mount Pleasant'];
  const cuisines = ['Select Cuisine', 'Southern', 'Wine Bars', 'Salad'];

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const selectItem = (type, item) => {
    if (type === 'city') setSelectedCity(item);
    else setSelectedCuisine(item);
    setOpenDropdown(null);
  };

  const renderHeader = () => (
    <>
      <ImageBackground
        source={{ uri: 'https://charlestonrestaurantguide.com/assets/frontend/media/home.png' }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>CHARLESTON RESTAURANT GUIDE</Text>
          <Text style={{ fontSize: 16, color: 'white' }}>Featuring the Best Charleston SC Restaurants.</Text>
          <TextInput
            placeholder='What are you looking for..'
            style={{ backgroundColor: 'white', color: 'lightgrey', width: '100%', marginTop: 10, marginBottom: 10, paddingLeft: 10, borderRadius: 6, fontWeight: '500' }}
          />

          <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('city')}>
              <Text style={styles.dropdownText}>{selectedCity}</Text>
              <Image source={{ uri: 'asset:/images/dropdown.png' }} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
            {openDropdown === 'city' && (
              <FlatList
                data={cities}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => selectItem('city', item)}>
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={() => toggleDropdown('cuisine')}>
              <Text style={styles.dropdownText}>{selectedCuisine}</Text>
              <Image source={{ uri: 'asset:/images/dropdown.png' }} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
            {openDropdown === 'cuisine' && (
              <FlatList
                data={cuisines}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => selectItem('cuisine', item)}>
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>

          <View style={{ width: '100%' }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isPressed ? '#ffc107' : '#1b1c1d' }]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Featured listings</Text>
        <Text style={{ fontSize: 16 }}>The featured listings are progressively below.</Text>
      </View>
    </>
  );

  const renderFooter = () => (
    <>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Visit our latest blogs</Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>Visit our valuable articles to get more information.</Text>
        <Image source={{ uri: 'https://shrturl.app/t3JZUw' }} style={{ width: '100%', height: 600, marginTop: 20 }} />
        <Text style={{ fontWeight: '500', fontSize: 22, marginVertical: 10, lineHeight: 25 }}>
          Charleston bachelorette party guide: The best restaurants, rooftop bars and nightlife for an unforgettable girls getaway
        </Text>
        <ReadMoreText
          shortText="Planning a bachelorette weekend in Charleston means combining historic charm with modern indulgence."
          fullText="Holy City offers the perfect backdrop for a stylish and unforgettable girls' getaway."
        />
        <Text style={{ color: '#999', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Editor</Text>
        <Text style={{ color: '#999', fontSize: 18, fontWeight: 'bold' }}>Wed, 04 Jun 2025</Text>
      </View>

      <View style={{ padding: 20 }}>
        <ImageBackground source={{ uri: 'https://shrturl.app/8gJwrJ' }} style={styles.backgroundimage2} resizeMode="cover">
          <View style={styles.overlayimage}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#333', fontSize: 18, fontWeight: '500', backgroundColor: 'rgb(192, 193, 195)', padding: 6, borderRadius: 20 }}>Read More</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Text style={{ fontSize: 22, fontWeight: '500', marginVertical: 10 }}>
          Sip & Savor: Wine Pairings with Southern Food in Downtown Charleston
        </Text>
        <ReadMoreText
          shortText="Downtown Charleston is where historic elegance meets culinary firepower."
          fullText="From flaky biscuits to she-crab soup, the Holy City’s Lowcountry flavors are rich in heritage."
        />
        <Text style={{ color: '#999', fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Editor</Text>
        <Text style={{ color: '#999', fontSize: 18, fontWeight: 'bold' }}>Wed, 04 Jun 2025</Text>
      </View>

      <View style={{ padding: 20 }}>
        <ImageBackground source={{ uri: 'https://shrturl.app/57obJ9' }} style={styles.backgroundimage2} resizeMode="cover">
          <View style={styles.overlayimage}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#333', fontSize: 18, fontWeight: '500', backgroundColor: 'rgb(192, 193, 195)', padding: 6, borderRadius: 20 }}>Read More</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Text style={{ fontSize: 22, fontWeight: '500', marginVertical: 10 }}>Savor the South: A Culinary Tour of Charleston Dining</Text>
        <ReadMoreText
          shortText="There are cities known for their charm, others for their food."
          fullText="Charleston’s culinary scene is as layered as its history."
        />
        <Text style={{ color: '#999', fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Editor</Text>
        <Text style={{ color: '#999', fontSize: 18, fontWeight: 'bold' }}>Wed, 04 Jun 2025</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Contact</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: '#333', borderRightColor: '#333', borderRightWidth: 1, paddingRight: 10 }}>About</Text>
          <Text style={{ fontSize: 18, color: '#333', borderRightColor: '#333', borderRightWidth: 1, paddingRight: 10 }}>Terms and Conditions</Text>
          <Text style={{ fontSize: 18, color: '#333' }}>Privacy policy</Text>
          <Text style={{ fontSize: 18, color: '#333' }}>FAQ</Text>
        </View>
      </View>
    </>
  );

  return (
    <FlatList
      data={save_search_listings}
      keyExtractor={(item) => item.id.toString()}
      // initialNumToRender={5}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <View style={{ flex: 1, width: '100%', height: 200, marginTop: 20,paddingHorizontal:20 }}>
          <ImageBackground source={{ uri: item.image_url }} style={styles.backgroundimage} resizeMode="cover">
            <View style={styles.overlayimage}>
              <TouchableOpacity onPress={() => navigation.navigate('Poogan', { id: item.id })}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', position: 'relative', top: 130 }}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: 950,
  },
  overlay: {
    backgroundColor: 'rgba(32, 31, 31, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingVertical: 30,
  },
  backgroundimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 15,
  overflow: 'hidden',
    
  },
  backgroundimage2: {
    flex: 1,
    width: '100%',
    height: 350,
  },
  overlayimage: {
    flex: 1,
    padding: 20,
    paddingVertical: 30,
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  container: {
    width: '100%',
  },
  dropdown: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: 'rgb(112, 108, 108)',
    fontWeight: '500',
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'rgb(112, 108, 108)',
    fontWeight: '500',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1B1C1D',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    alignItems: 'center',
  },
});
