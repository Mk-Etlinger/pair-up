import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

function HelpRequestForm() {
  const [value, onChangeText] = useState('');

  function handleOnSubmit(e) {
    console.log(e);
  }

  return (
    <View>
      <Text>Name</Text>
      <TextInput 
        value={value}
        onChangeText={(text) => onChangeText(text) }
        placeholder="Placeholder text"
      />
      <Text>Contact Number</Text>
      <TextInput 
        value={value}
        onChangeText={(text) => onChangeText(text) }
        placeholder="Placeholder text"
      />

      <Button
        title="SUBMIT"
        color="#f194ff"
        onPress={handleOnSubmit}
      />
    </View>
  )
}

export default function App() {
  

  return (
    <View style={styles.container}>
      {/* <Text>Testing!</Text> */}
      <HelpRequestForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
