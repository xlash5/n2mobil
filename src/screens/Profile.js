import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Caption, Card, Title, Paragraph, Text, ActivityIndicator, Avatar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Palette } from '../theme/colors';
import storage from '@react-native-firebase/storage';

const Profile = () => {
    const userDoc = firestore().collection('users').doc(auth().currentUser.uid);
    const [userData] = useDocumentData(userDoc);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        storage().ref(`${auth().currentUser.uid}.png`).getDownloadURL()
            .then((url) => {
                setImageUrl(url);
            }).catch((e) => { console.log(e) })
    }, []);

    return (
        <View style={styles.container}>
            {userData ?
                <ScrollView>
                    <View style={{ alignItems: 'center', }}>
                        <View style={{ height: 40.0 }}></View>
                        <Avatar.Image
                            size={120}
                            source={imageUrl ? { uri: imageUrl } : require('../assets/camera.png')}
                        />
                        <Title style={styles.text}>Username : {userData.name}</Title>
                        <Title style={styles.text}>Mail Adress : {auth().currentUser.email}</Title>
                        <Title style={styles.text}>Number of Saved Places : {userData.places.length}</Title>
                    </View>
                </ScrollView>
                : <ActivityIndicator animating={true} color={Palette.blue} />}
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        marginTop: 10.0,
    }
})
