import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WordDetailScreen from "../screens/WordDetailScreen";
import ViewedWordsScreen from "../screens/ViewedWordsScreen/ViewedWordsScreen";
import Icon from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: "white",
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: "#273469",
      tabBarIcon: ({ color, size, focused }) => {
        switch (route.name) {
          case "Home":
            return <Icon name="home" size={size} color={focused ? "#273469" : color} />;
          case "Words Visualized":
            return <Icon name="eye" size={size} color={focused ? "#273469" : color} />;
          default:
            return;
        }
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Words Visualized" component={ViewedWordsScreen} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen 
          name="WordDetail" 
          component={WordDetailScreen} 
          options={{ 
            headerStyle: { 
              backgroundColor: '#A3D8E5',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
            },
            headerBackTitle: "Back",
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
