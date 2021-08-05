import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { TextInput, Button, Caption, Snackbar } from 'react-native-paper';

const Login = ({ navigation }) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);

    const onDismissSnackBar = () => setErr(false);

    const buttonLogIn = () => {
        try {
            if (!mail && !password) {
                setErr(true);
                return;
            }
            auth().signInWithEmailAndPassword(mail, password)
                .then(() => {
                    console.log('Login successful');
                }).catch(() => {
                    setErr(true);
                });
        } catch (e) {
            console.log('Login failed');
            setErr(true);
        }
    };

    return (
        <View style={styles.container}>
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
            <View style={styles.buttonRow}>
                <Button
                    mode="contained"
                    onPress={buttonLogIn}
                    style={styles.button}
                >
                    LogIn
                </Button>
                <View style={{ width: 20.0 }}></View>
                <Button
                    mode="contained"
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }}
                    style={styles.button}
                >
                    Sign Up
                </Button>
            </View>
            <Snackbar
                visible={err}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Close',
                    onPress: onDismissSnackBar,
                }}>
                Something went wrong.
            </Snackbar>
        </View>
    )
}

export default Login

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
