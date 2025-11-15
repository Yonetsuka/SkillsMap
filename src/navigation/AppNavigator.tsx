import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddCompetencyScreen from '../screens/AddCompetencyScreen';
import DetailScreen from '../screens/DetailScreen';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Add: undefined;
  Detail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Competências' }} />
        <Stack.Screen name="Add" component={AddCompetencyScreen} options={{ title: 'Adicionar' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
