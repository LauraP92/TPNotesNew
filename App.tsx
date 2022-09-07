import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TestComponent from './src/components/TestComponent';


const App = () => {
  const test = false

  let name: string | null = 'Laura';

  name = null

  return (
    <ScrollView>
      <TestComponent
        containerStyle={[{ flex: 1 }, test && { borderBottomWidth: 1 }]}
        textStyle={{ fontSize: 40, borderStyle: 'solid' }} color='#000000' title={{ name: 'Test' }}></TestComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

});

export default App;
