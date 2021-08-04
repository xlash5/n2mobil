import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button, Caption } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="SignUp" component={SignUp} />
        </AuthStack.Navigator>
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
        >
            LOG OUT
        </Button>
    ),
};

function HomeStackScreen() {

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={defaultAppbarOptions} />
            <HomeStack.Screen
                name="Map"
                component={MapScreen}
                options={defaultAppbarOptions} />
            <HomeStack.Screen
                name="ListOfPlaces"
                component={ListOfPlaces}
                options={defaultAppbarOptions} />
            <HomeStack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={defaultAppbarOptions} />
            <HomeStack.Screen
                name="Profile"
                component={Profile}
                options={defaultAppbarOptions} />
        </HomeStack.Navigator>
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
            <NavigationContainer>
                <AuthStackScreen />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer  >
            <HomeStackScreen />
        </NavigationContainer >
    );
}