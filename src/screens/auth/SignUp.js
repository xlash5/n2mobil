import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Caption, Avatar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const SignUp = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const buttonSignUp = async () => {
        try {
            if ((password === repeatPassword) && userName) {
                auth().createUserWithEmailAndPassword(mail, password).then(data => {

                    let reference = storage().ref(`${data.user.uid}.png`);
                    let task = reference.putFile(profileImage.uri);

                    task.then((t) => {
                        console.log('Image uploaded to the bucket!');
                    }).catch((e) => console.log('uploading image error => ', e));

                    firestore()
                        .collection('users')
                        .doc(data.user.uid)
                        .set({
                            name: userName,
                            places: []
                        })
                        .then(() => {
                            console.log('User added!');
                        });
                });

            }
        } catch (e) {
            console.log('Creating account failed');
        }
    };

    const imageOnPress = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(response.assets[0].uri);
                console.log(utils.FilePath.PICTURES_DIRECTORY);
                setProfileImage(response.assets[0]);

            }
        });

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ height: 20.0 }}></View>
                <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                    onPress={() => {
                        imageOnPress();
                    }}
                >
                    <Avatar.Image
                        size={120}
                        source={profileImage ? { uri: profileImage.uri } : require('../../assets/camera.png')}
                    />
                </TouchableOpacity>
                <TextInput
                    label="UserName"
                    style={styles.input}
                    onChangeText={e => setUserName(e)}
                />
                <TextInput
                    label="Email"
                    style={styles.input}
                    onChangeText={e => setMail(e)}
                />
                <TextInput
                    label="Password"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={e => setPassword(e)}
                />
                <TextInput
                    label="Repeat Password"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={e => setRepeatPassword(e)}
                />
                <View style={styles.buttonRow}>
                    <Button
                        mode="contained"
                        onPress={buttonSignUp}
                        style={styles.button}
                        disabled={(userName && repeatPassword && password && profileImage ? false : true)}
                    >
                        Sign Up
                    </Button>
                </View>
                <View style={{ height: 20.0 }}></View>
            </ScrollView>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginHorizontal: 50.0,
        marginVertical: 20.0,
    },
    button: {

    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
