import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import TestComponent from './src/components/TestComponent';
import HomeScreen from './src/screens/Home/Home';
import NoteDetails from './src/screens/NoteDetails/NoteDetails';


const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  // const test = false

  // let name: string | null = 'Laura';

  // name = null

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerTitleStyle: {
            color: '#3A96EB',
            fontSize: 24,
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NoteDetails" component={NoteDetails}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>


    // <ScrollView>
    //   <TestComponent
    //     containerStyle={[{ flex: 1 }, test && { borderBottomWidth: 1 }]}
    //     textStyle={{ fontSize: 40, borderStyle: 'solid' }} color='#000000' title={{ name: 'Test' }}></TestComponent>
    //   <TemplateText>
    //     bbbbbbbbb
    //     <TemplateText style={{ color: 'red' }} onPress={() => console.log('Laura')}>
    //       bgujuybjvjvy
    //     </TemplateText>
    //     aaaaaaaaaaa
    //   </TemplateText>
    //   <TemplateIcon name='add' family='Ionicons' size={20} color='#000000' ></TemplateIcon>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({

});

export default App;
