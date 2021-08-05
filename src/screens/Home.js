import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Caption, Title } from 'react-native-paper';

const Home = ({ navigation }) => {
    const [userName, setUserName] = useState('');

    const getCurrentDay = () => {
        let d = new Date();
        let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return weekday[d.getDay()];
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ height: 40.0 }}></View>
                <Title style={styles.text}>
                    Welcome! Have a great {getCurrentDay()}! It is time to explore new places. 😎
                </Title>
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
    },
    text: {
        marginHorizontal: 50.0,
        textAlign: 'center',
    },
})
