import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Caption, Card, Title, Paragraph, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import CardWithButton from '../components/CardWithButton';

const ListOfPlaces = () => {
    const userDoc = firestore().collection('users').doc(auth().currentUser.uid);
    const [userData] = useDocumentData(userDoc);

    const onRemovePressed = (e) => {
        firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({
                places: userData.places.filter(place => {
                    return ((place.title !== e.title) && (place.desc !== e.desc) & (place.coor !== e.coor))
                })
            })
    }

    return (
        <View>
            <ScrollView>
                <View style={{ height: 10.0 }}></View>

                {userData && userData.places.map((e, index) => {
                    return (
                        <CardWithButton
                            key={e.desc + e.coor.latitude}
                            buttonAction={() => onRemovePressed(e)}
                            title={e.title}
                            desc={e.desc}
                            buttonText="Remove"
                        />
                    );
                })}

                <View style={{ height: 20.0 }}></View>
            </ScrollView>
        </View>
    )
}


export default ListOfPlaces;
