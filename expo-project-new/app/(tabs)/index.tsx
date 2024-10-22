import React from "react";
import { Button, Text, View, AppRegistry } from "react-native"; // Import AppRegistry
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}> {/* Only one NavigationContainer */}
      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = () => {
  return (
    <View>
      <Text>This is my first navigation home screen</Text>
    </View>
  );
};

const Login = (props) => {
  return (
    <View>
      <Text>This is my first navigation login screen</Text>
      <Button title="Go to Home" onPress={() => props.navigation.navigate("Home")} />
    </View>
  );
};

// Use the name defined in app.json
AppRegistry.registerComponent("expo-project-new", () => App);

export default App;
