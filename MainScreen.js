import React from 'react';
import { StyleSheet, TouchableOpacity,View,Text ,Image,color} from 'react-native';
import { useState } from 'react';
import HomeScreen from './HomeScreen';
import BlogScreen from './BlogScreen';
import MapScreen from './MapScreen';

const MainScreen = () => {
    const [activeScreen, setActiveScreen] = useState('Home');
    const renderScreen = () => {
    switch (activeScreen) {
      case 'HomeScreen':
        return <HomeScreen />;
      case 'BlogScreen':
        return <BlogScreen />;
      case 'MapScreen':
        return <MapScreen />;
      default:
        return <HomeScreen />;
    }
  };
  return (

    
    <View style={{flex:1}}>
          <View style={{ flex: 1 }}>{renderScreen()}</View>
        <View style={{padding:10,width:'100%',position:'absolute',bottom:10}}>
             <View  style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',
                backgroundColor:'rgb(255, 255, 255)',paddingVertical:10,borderRadius:20,
                borderColor:'rgb(222, 220, 220)',borderWidth:2}}>
            <View>
                <TouchableOpacity onPress={() => setActiveScreen('BlogScreen')}>
                     <Image
    source={{ uri: 'asset:/images/job.png' }}
    style={[
      styles.icon,
      activeScreen === 'BlogScreen' && styles.activeIcon
    ]}
  />
  <Text style={activeScreen === 'BlogScreen' ? styles.activeText : styles.tabText}>Blog</Text>
            </TouchableOpacity> 
            </View>
             <View >
                <TouchableOpacity onPress={() => setActiveScreen('HomeScreen')} >
                      <Image
    source={{ uri: 'asset:/images/home.png' }}
    style={[
      styles.icon,
      activeScreen === 'HomeScreen' && styles.activeIcon
    ]}
  />
  <Text style={activeScreen === 'HomeScreen' ? styles.activeText : styles.tabText}>Home</Text>
            </TouchableOpacity> 
            </View>
              <View>
                <TouchableOpacity onPress={() => setActiveScreen('MapScreen')}>
                      <Image
    source={{ uri: 'asset:/images/Map.png' }}
    style={[
      styles.icon,
      activeScreen === 'MapScreen' && styles.activeIcon
    ]}
  />
  <Text style={activeScreen === 'MapScreen' ? styles.activeText : styles.tabText}>Map</Text>
            </TouchableOpacity> 
            </View>
             </View>
        </View>
    </View>
  )
}
export default MainScreen

const styles = StyleSheet.create({

     icon: {
    width: 30,
    height: 30,
    tintColor: 'black', // default tint
    alignSelf:'center'
  },
  activeIcon: {
    tintColor: '#007AFF', // active tab color
    alignSelf:'center'
  },
  tabText: {
    color: '#888',
    fontSize: 16,
   
  },
  activeText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  

})