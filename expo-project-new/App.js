import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('0');
  const [email, setEmail] = useState('');

  const saveData = async () => {
    console.warn(name);
    const url = "https://jsonplaceholder.typicode.com/users";
    
    let result = await fetch(url, {
      method : "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({name,email,age})
    });
    result = await result.json();
    if(result){
      console.warn("data added")
    }
  }

  return (
    <View>
      <Text style={{ fontSize: 30 }}>Post</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
        keyboardType="numeric" 
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address" 
      />
      <Button title="Save Data" onPress={saveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'skyblue',
    borderWidth: 1,
    margin: 20,
    fontSize: 20,
    padding: 10, 
  },
});

export default App;










