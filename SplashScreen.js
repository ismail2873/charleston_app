import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainScreen'); // or navigation.navigate('Home')
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <View style={styles.container}>
      <View > 
<Image source={{ uri: 'asset:/images/logo.png' }} style={{ width: 200, height: 200 }} />
      </View>
      
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding:20
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    
  },
});