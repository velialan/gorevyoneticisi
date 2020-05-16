import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ThemeProvider} from 'styled-components';

import AddTask from './Screens/AddTask';
import Homes from './Screens/Home';
import Tasks from './Screens/Tasks';

import theme from './utils/theme';
import { Grid, Plus, Home } from './Components/icons';
import Box from './Components/box';






const Tab = createBottomTabNavigator();
function Router() {

    return (
        <ThemeProvider theme={theme}>
        <NavigationContainer   >
            <Tab.Navigator
                initialRouteName="Home"               
                tabBarOptions={{
                    activeTintColor: '#5F87E7',
                    showLabel:false
                }}>
                <Tab.Screen
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Home height={size} width={size} stroke={color} />
                        ),
                    }} name="Home" component={Homes} />

                <Tab.Screen  options={{
                    tabBarLabel: 'AddTask',

                    tabBarIcon: ({ color, size }) => (
                        <Box borderWidth={1} borderColor={color} mb={5} size={70} borderRadius="full" bg="white" justifyContent="center" alignItems="center" >
                            <Box size={40} borderRadius="full" bg={color} justifyContent="center" alignItems="center" >
                            <Plus strokeWidth={3} height={size} width={size} stroke="#fff" />
                            </Box>
                        </Box>
                    ),
                }} name="AddTask" component={AddTask} />

                <Tab.Screen   options={{
                    tabBarLabel: 'Tasks',
                    tabBarIcon: ({ color, size }) => (
                        <Grid height={size} width={size} stroke={color} />
                    ),
                }} name="Tasks" component={Tasks} />

            </Tab.Navigator>
        </NavigationContainer>
        </ThemeProvider>
    );
}

export default Router;