import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Caption } from 'react-native-paper';

const Home = ({ navigation }) => {
    const [userName, setUserName] = useState('');

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ height: 40.0 }}></View>
                <Button
                    mode="contained"
                    onPress={() => {
                        navigation.navigate('Map')
                    }}
                    style={styles.button}
                >
                    Map Screen
                </Button>
                <View style={{ height: 20.0 }}></View>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('ListOfPlaces')}
                    style={styles.button}
                >
                    List of places
                </Button>
                <View style={{ height: 20.0 }}></View>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('ChangePassword')}
                    style={styles.button}
                >
                    Change Password
                </Button>
                <View style={{ height: 20.0 }}></View>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.button}
                >
                    Profile
                </Button>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    }
})
