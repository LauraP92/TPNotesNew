import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/Home/Home';
import NoteDetails from './src/screens/NoteDetails/NoteDetails';


const Stack = createNativeStackNavigator();
const App: () => Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerTitle: true,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NoteDetails" component={NoteDetails} options={{
          title: '',
        }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;
