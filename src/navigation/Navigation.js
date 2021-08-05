import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button, Caption } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import Home from '../screens/Home';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import MapScreen from '../screens/MapScreen';
import ListOfPlaces from '../screens/ListOfPlaces';
import ChangePassword from '../screens/ChangePassword';
import Profile from '../screens/Profile';



const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen name="SignUp" component={SignUp} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
}

const HomeStack = createNativeStackNavigator();

const buttonLogOut = () => {
    auth()
        .signOut()
        .then(() => {
            console.log('User signed out!');
        });
}

const defaultAppbarOptions = {
    headerRight: () => (
        <Button
            mode="contained"
            onPress={buttonLogOut}
            style={{ marginRight: 10.0 }}
        >
            LOG OUT
        </Button>
    ),
};

const Drawer = createDrawerNavigator();

function HomeStackScreen() {

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home"
                    component={Home}
                    options={defaultAppbarOptions} />
                <Drawer.Screen name="Map"
                    component={MapScreen}
                    options={defaultAppbarOptions} />
                <Drawer.Screen name="List Of Places"
                    component={ListOfPlaces}
                    options={defaultAppbarOptions} />
                <Drawer.Screen name="Change Password"
                    component={ChangePassword}
                    options={defaultAppbarOptions} />
                <Drawer.Screen name="Profile"
                    component={Profile}
                    options={defaultAppbarOptions} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default function Navigation() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });
    }, [auth()])

    if (!loggedIn) {
        return (
            <AuthStackScreen />
        );
    }

    return (
        <HomeStackScreen />
    );
}