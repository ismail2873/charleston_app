import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './MapScreen.js';
import HomeScreen from './HomeScreen.js';
import ReadMoreText from './ReadmoreText.js';
import SplashScreen from './SplashScreen.js';
import BlogScreen from './BlogScreen.js';
import Poogan from './HomeListScreens/Poogan.js';
import MainScreen from './MainScreen.js';
import Smokehouse from './HomeListScreens/Smokehouse.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen}   />
       
         <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
         <Stack.Screen name="BlogScreen" component={BlogScreen}/>
           <Stack.Screen name="MapScreen" component={MapScreen}/>
         <Stack.Screen name="ReadmoreText" component={ReadMoreText}   />
          <Stack.Screen name="Poogan" component={Poogan}   />
              <Stack.Screen name="Smokehouse" component={Smokehouse}    />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}