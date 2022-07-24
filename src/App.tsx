import React from "react";
import { Text, View} from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { registerRootComponent } from "expo";
import { Home, MapList } from "@screens";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

type RootStackParamList = {
  Home: undefined; // undefined because you aren't passing any params to the home screen
  MapList: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = () => {
  return <Home></Home>;
};

const MapListScreen = () => {
  return <MapList></MapList>;
};

//Created dummy About Us screen to test all three tabs
const AboutUsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Text style={{ fontSize: 30 }}>About Us</Text>
    </View>
  );
};

// If the focused route is not found, we need to assume it's the initial screen
// This can happen during if there hasn't been any navigation inside the screen
// In our case, it's "Home" as that's the first screen inside the navigator
const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Map":
      return "MapList";
    case "About Us":
      return "About Us";
  }
};

const Tabs = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000000" },
        tabBarIcon: ({ color, size }) => {
  
          if (route.name === "Home") {
            return <Ionicons name='home' size={size} color={color} />;
          } else if (route.name === "Map") {
            return <Ionicons name='map' size={size} color={color} />;
          } else if (route.name === "About Us") {
            return <Ionicons name='information-circle-outline' size={size} color={color} />;
          }      
        },
        tabBarActiveTintColor: "#ffc529",
        tabBarInactiveTintColor: "#ffffff",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapListScreen} />
      <Tab.Screen name="About Us" component={AboutUsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs"> 
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="MapList" component={MapListScreen} /> 
        <Stack.Screen name="About Us" component={AboutUsScreen} /> 
        <Stack.Screen name="Tabs" component={Tabs} /> 
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default registerRootComponent(App);



  