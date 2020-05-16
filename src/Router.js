import * as React from 'react';
import { View, Text,TouchableOpacity,useColorScheme } from 'react-native';
import { NavigationContainer,DarkTheme,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddTask from './Screens/AddTask';
import Homes from './Screens/Home';
import Tasks from './Screens/Tasks';

import { Grid, Plus, Home } from './Components/icons';



const Tab = createBottomTabNavigator();
function Router() {
    const colorScheme = useColorScheme();

    return (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
            <Tab.Navigator
                initialRouteName="AddTask"
                tabBarOptions={{
                    activeTintColor: '#5F87E7',
                }}>
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Ana Sayfa',
                        tabBarIcon: ({ color, size }) => (
                            <Home height={size} width={size} stroke={color} />
                        ),
                    }} name="Home" component={Homes} />

                <Tab.Screen  options={{
                    tabBarLabel: 'Görev Ekle',
                    showlabel:false,

                    tabBarIcon: ({ color, size }) => (
                        <View style={{ bottom:8, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff' }}>
                            <View style={{   width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center',backgroundColor:color }}>
                            <Plus strokeWidth={3} height={size} width={size} stroke="#fff" />

                            </View>
                        </View>
                    ),
                }} name="AddTask" component={AddTask} />

                <Tab.Screen   options={{
                    tabBarLabel: 'Görevler',
                    tabBarIcon: ({ color, size }) => (
                        <Grid height={size} width={size} stroke={color} />
                    ),
                }} name="Tasks" component={Tasks} />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Router;