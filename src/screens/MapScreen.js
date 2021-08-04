import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps';
import { Palette } from '../theme/colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { TextInput, Button, Caption, ActivityIndicator } from 'react-native-paper';
import GetLocation from 'react-native-get-location';

const MapScreen = () => {
    const userDoc = firestore().collection('users').doc(auth().currentUser.uid);
    const [userData] = useDocumentData(userDoc);
    const [curMarker, setCurMarker] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState(null);

    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                setLocation(location);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });
    }, []);

    const handleMapPress = (e) => {
        setCurMarker(e.nativeEvent.coordinate)
    }

    const addPlace = () => {
        if (curMarker) {
            firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .update({
                    places: [...userData.places, { title: title, desc: desc, coor: curMarker }]
                })
                .then(() => {
                    setTitle('');
                    setDesc('');
                    setCurMarker(null);
                });
        }
    }

    return (
        <View style={styles.container}>
            {location ? <MapView
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
                showsUserLocation={true}
                style={styles.map}
                onPress={handleMapPress}
            >
                {userData && userData.places.map((e, index) => {
                    return <MapView.Marker
                        key={e.desc + e.coor.latitude}
                        coordinate={e.coor}
                        title={e.title}
                        description={e.desc}
                        pinColor={Palette.blue}
                    />
                })}

                {curMarker && <MapView.Marker
                    key={curMarker.latitude}
                    coordinate={curMarker}
                    pinColor={Palette.red}
                />}
            </MapView> : <ActivityIndicator animating={true} color={Palette.blue} />}
            <View style={styles.bottomContainer}>
                <TextInput
                    label="Title"
                    value={title}
                    style={styles.input}
                    onChangeText={e => setTitle(e)}
                />
                <TextInput
                    label="Description"
                    value={desc}
                    style={styles.input}
                    onChangeText={e => setDesc(e)}
                />
                <Button
                    mode="contained"
                    onPress={addPlace}
                    style={styles.button}
                    disabled={(title && desc) ? false : true}
                >ADD</Button>

            </View>
        </View >
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    map: {
        flex: 1,
    },
    bottomContainer: {
        height: 180.0,
        paddingHorizontal: 20.0,
        paddingTop: 10.0,
    },
})
