import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MapView, { Marker } from 'react-native-maps';
import  { useRef } from 'react';
import { findNodeHandle } from 'react-native';
import { UIManager } from 'react-native';
import { Linking } from 'react-native';
import save_search_listings from '../JsonFiles/save_search_listings.json'
import save_search_schedules from '../JsonFiles/save_search_schedules.json'
const openInGoogleMaps = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url).catch(err => console.error("Failed to open Google Maps", err));
};




//       const ratings = [
//   { stars: '5 Stars', width: '75%' },
//   { stars: '4 Stars', width: '60%' },
//   { stars: '3 Stars', width: '40%' },
//   { stars: '2 Stars', width: '20%' },
//   { stars: '1 Star',  width: '10%' },
// ];

const locations = [
  {
    id: 1,
    title: 'Location 1',
    description: 'This is location 1',
    latitude: 37.79600,
    longitude: -122.3324,
  },
  
];


const images = [
  { uri: 'https://rb.gy/jf1zq3' },
  { uri: 'https://shrturl.app/ymL8wP' },
  { uri: 'https://shrturl.app/3O9mJl' },
  { uri: 'https://shrturl.app/eouhbe' },
  { uri: 'https://shrturl.app/NlECCZ' },
  { uri: 'https://shrturl.app/V-OSJk' },
  { uri: 'https://shrturl.app/X4KfoY' },
  { uri: 'https://shrturl.app/_gsM-q' },
  { uri: 'https://shrturl.app/dJ1xrb' },
  { uri: 'https://shrturl.app/5QiWE2' },
  { uri: 'https://shrturl.app/QQH-zt' },
  { uri: 'https://shrturl.app/jO_2aT' },
  { uri: 'https://shrturl.app/vf32im' },

];

const hours = [
  { day: 'Sunday', times: ['9 am - 3 pm'] },
  { day: 'Sunday', times: ['9 am - 3 pm'] },
  { day: 'Monday', times: ['9 am - 4 pm'] },
  { day: 'Monday', times: ['9 am - 4 pm'] },
  { day: 'Tuesday', times: ['9 am - 3 pm'] },
  { day: 'Tuesday', times: ['9 am - 3 pm'] },
  { day: 'Wednesday', times: ['9 am - 4 pm'] },
  { day: 'Wednesday', times: ['9 am - 4 pm'] },
  { day: 'Thursday', times: ['9 am - 3 pm'] },
  { day: 'Thursday', times: ['9 am - 3 pm'] },
  { day: 'Friday', times: ['9 am - 4 pm'] },
  { day: 'Friday', times: ['9 am - 4 pm'] },
  { day: 'Saturday', times: ['9 am - 3 pm'] },
  { day: 'Saturday', times: ['9 am - 3 pm'] },
];

const Poogan = () => {

const route = useRoute();
const { id } = route.params;

const filtered = save_search_listings.filter(item => item.id.toString() === id.toString());
const listing = filtered[0];

const hours = save_search_schedules.filter(item => item.listing_id.toString() === id.toString());
const [expanded, setExpanded] = useState(false);

  const toggleText = () => {
    setExpanded(!expanded);
  };


const [activeTab, setActiveTab] = useState('description');


const scrollRef = useRef(null);
const descRef = useRef(null);
const reviewsRef = useRef(null);
const bookingsRef = useRef(null);
const [sectionPositions, setSectionPositions] = useState({});

const scrollToSection = (ref, sectionName) => {
  const nodeHandle = findNodeHandle(scrollRef.current);

  if (ref.current && nodeHandle) {
    UIManager.measureLayout(
      findNodeHandle(ref.current),
      nodeHandle,
      (error) => {
        console.log('measureLayout error:', error);
      },
      (x, y) => {
        scrollRef.current.scrollTo({ y, animated: true });
        setActiveTab(sectionName);
      }
    );
  }
};

 const [isVisible, setIsVisible] = useState(false);

      const menuItems = [`${listing.name}`, `${listing.address}`, `${listing.city}`,`${listing.website}`];

 const toggleDropdown = () => {
        setIsVisible(!isVisible);
      };
    
      const handleContact = (label) => {
        console.log('Selected:', label);
        setIsVisible(false);
      };
   
 const mapRef = useRef(null);
  
   const handleLocationPress = (loc) => {
  console.log('Pressed location:', loc.latitude, loc.longitude);

  if (mapRef.current) {
    console.log('Map ref is ready, zooming...');
    mapRef.current.animateToRegion(
      {
        latitude: parseFloat(loc.latitude),
        longitude: parseFloat(loc.longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000
    );
  } else {
    console.warn('mapRef.current is null');
  }
};

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'option1', label: `${listing.name}` },
    { id: 'option2', label: `${listing.address}` },
    { id: 'option3', label: `${listing.display_phone}` }
  ];
  const handleSelect = (id) => {
    setSelectedOption(id);
  };

  return (
   <View>
     <View style={styles.stickyTabBar}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#333333',width:'100%' }}>
 <TouchableOpacity onPress={() => scrollToSection(descRef, 'description')}>
  <Text style={[styles.tabText2, activeTab === 'description' && styles.activeTab2]}>
    Descriptions
  </Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => scrollToSection(reviewsRef, 'reviews')}>
  <Text style={[styles.tabText2, activeTab === 'reviews' && styles.activeTab2]}>
    Reviews
  </Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => scrollToSection(bookingsRef, 'bookings')}>
  <Text style={[styles.tabText2, activeTab === 'bookings' && styles.activeTab2]}>
    Bookings
  </Text>
</TouchableOpacity>
</View>
</View>
 <ScrollView ref={ref => (scrollRef.current = ref)}
    onScroll={(e) => {
  const scrollY = e.nativeEvent.contentOffset.y;
  const buffer = 100; // for margin of error

  if (sectionPositions.bookings && scrollY >= sectionPositions.bookings - buffer) {
    setActiveTab('bookings');
  } else if (sectionPositions.reviews && scrollY >= sectionPositions.reviews - buffer) {
    setActiveTab('reviews');
  } else if (sectionPositions.description) {
    setActiveTab('description');
  }
}}
scrollEventThrottle={16}>
        
      <View>
        <Image source={{ uri: listing.image_url }}
          style={{ width: '100%', height: 400 }} />
      </View>

    
     
 <View style={{ padding: 20 }}>
        <Text style={{ color: 'black', fontSize: 26, fontWeight: 'bold', }}>{listing.name}</Text>
      </View>
      <View style={{ padding: 20 }}>
        <View>
          {options.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionRow}
              onPress={() => handleSelect(item.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image
                  source={
                    selectedOption === item.id
                      ? { uri: 'asset:/images/checked.png' }
                      : { uri: 'asset:/images/check.png' }
                  }
                  style={styles.checkImage}
                />
                <Text style={styles.label}>{item.label}</Text>
              </View>

            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View ref={ref => (descRef.current = ref)}  onLayout={event => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions(prev => ({ ...prev, description: y }));
  }} style={{ padding: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>About</Text>
       <Text numberOfLines={expanded ? undefined : 2}>{listing.description}</Text>
         <TouchableOpacity onPress={toggleText}>
        <Text style={{ color: 'blue', marginTop: 5 }}>
          {expanded ? 'Show less' : 'Show more'}
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{ padding: 20 }}>

        <View style={{ padding: 20, backgroundColor: 'rgb(196, 224, 223)' }}>
          <Image source={{ uri: 'asset:/images/open2.png' }}
            style={{ width: '50', height: '50', position: 'absolute', right: 10 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 26, marginTop: 20 }}>Opening Hours</Text>
          {hours.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 5 }}>{item.day_of_week}</Text>
              <Text style={{ fontWeight: '500', fontSize: 18 }}>{item.opening_time} - {item.closing_time}</Text>


            </View>
          ))}
          {/* {hours.map((hour, index) => (
        <Text key={index}>
          {hour.day_of_week}: {hour.opening_time} - {hour.closing_time}
        </Text>
      ))} */}
        </View>

      </View>


      <View style={{ padding: 20 }}>
        <View style={{ paddingVertical: 20, borderTopColor: 'rgb(177, 177, 177)', borderTopWidth: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 10 }}>Photo Gallery</Text>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Animatable.View
                animation="zoomIn"
                duration={700}
                delay={index * 300} // delay for staggered effect
                style={styles.card}
              >
                <Image source={{ uri: item.uri }} style={styles.image} />
              </Animatable.View>
            )}
          />
        </View>
      </View>
       <View style={styles.container3}>
  <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>Map</Text>

  <MapView
    ref={mapRef}
    style={styles.map}
    initialRegion={{
      latitude: parseFloat(listing.latitude),
      longitude: parseFloat(listing.longitude),
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    }}
  >
    <Marker
      coordinate={{
        latitude: parseFloat(listing.latitude),
        longitude: parseFloat(listing.longitude),
      }}
      title={listing.name}
      description={listing.address}
      onCalloutPress={() => openInGoogleMaps(parseFloat(listing.latitude), parseFloat(listing.longitude))}
    />
  </MapView>

  <View style={styles.list}>
    <Text style={styles.listTitle}>Marked Location:</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity
          key={listing.id}
          style={styles.locationItem}
          onPress={() => handleLocationPress(listing)}
        >
          <Text style={styles.locationTitle}>{listing.address}</Text>
          <Text style={styles.locationDesc}>{listing.city}, {listing.state}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
</View>


    <View  ref={ref => (reviewsRef.current = ref)}  onLayout={event => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions(prev => ({ ...prev, reviews: y }));
  }} style={{padding:20}}>
      <Text style={{fontWeight:'bold',fontSize:26}}>Reviews</Text>
      <View style={{justifyContent:'center',alignItems:'center',padding:20,backgroundColor:'rgb(42, 152, 93)',marginTop:10,borderRadius:8}}>
        <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>Based on Reviews</Text>
        
      </View>
      <View style={{marginTop:10}}>
<View style={styles.row2}>
  <Text style={styles.label2}> {listing.rating} ⭐</Text>
  <View style={[styles.bar, { width: `${listing.rating * 15}%` }]} />
</View>
      </View>
      
    </View>
      <View  ref={ref => (bookingsRef.current = ref)}  onLayout={event => {
    const { y } = event.nativeEvent.layout;
    setSectionPositions(prev => ({ ...prev, booking: y }));
  }} style={{padding:20}}>
                <View >
             <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
               <Text style={styles.buttonText}>Contact</Text>
                <Image source={{ uri: 'asset:/images/dropdown.png' }}
                     style={{ width: 15, height: 15 }} />
             </TouchableOpacity>
       
             {isVisible && (
              menuItems.map((item) => (
                <TouchableOpacity key={item} onPress={() => handleContact(item)} style={styles.item}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              ))
            )}
           </View>
             </View>

     
              <View style={{ padding: 20 }}>
      
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: '#333', borderRightColor: '#333', borderRightWidth: 1, paddingRight: 10 }}>About</Text>
          <Text style={{ fontSize: 18, color: '#333', borderRightColor: '#333', borderRightWidth: 1, paddingRight: 10 }}>Terms and Conditions</Text>
          <Text style={{ fontSize: 18, color: '#333' }}>Privacy policy</Text>
          <Text style={{ fontSize: 18, color: '#333' }}>FAQ</Text>
        </View>
      </View>
    </ScrollView>
   </View> 
   

  )
}

export default Poogan

const styles = StyleSheet.create({

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkImage: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 20,
    color: 'rgb(120, 119, 119)',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  image: {
    width: 250,
    height: 200,
    borderRadius: 10,
    marginRight: 15,
  },
   list: {
    // paddingHorizontal: 10,
    marginTop: 10,
  },
  container3:{
    //  flex: 1,
padding:20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
  },
  locationItem: {
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical:5,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    borderWidth:1,
    borderColor:'rgb(141, 138, 138)',
    width:200
  
  },
  locationTitle: {
    fontWeight: 'bold',
  },
  locationDesc: {
    color: '#555',
  },
  map: {
    height:400,
    width: '100%',
  },
  row2: { 
    flexDirection: 'row',
     alignItems: 'center',
      marginBottom: 6,
      
     },
  label2: {
     width: 70,
      fontSize: 16,
      fontWeight:'bold'
     },
  bar: {
    height: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    marginLeft: 8,
    
  },
  button: {
    marginTop:20,
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize:18
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
    color: 'rgb(107, 107, 107)',
  },
  tabText2: {
  color: '#aaa',
  fontSize: 16,
  fontWeight: '600',
  paddingBottom: 6,
},
activeTab2: {
  color: '#fff',
  borderBottomColor: '#00C2CB',
  borderBottomWidth: 3,
},
stickyTabBar: {
//   position: 'absolute', 
//   top: 0,
  backgroundColor: '#333333',
  zIndex: 10,
},
});
