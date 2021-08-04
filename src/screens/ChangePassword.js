import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button, Caption } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ChangePassword = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [err, setErr] = useState(false);

    const changePassword = () => {
        if (password === repeatPassword) {
            auth().currentUser.updatePassword(password).then(() => {
                navigation.navigate('Home')
            });
        } else {
            setErr(true);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="New Password"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={e => setPassword(e)}
            />
            <TextInput
                label="New Password Repeat"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={e => setRepeatPassword(e)}
            />
            <View style={styles.buttonRow}>
                <Button
                    mode="contained"
                    onPress={changePassword}
                    style={styles.button}
                >
                    Save
                </Button>
            </View>
            {err ? <Caption style={{ alignSelf: 'center', color: 'red' }}>Passwords Should match</Caption> : null}
        </View>
    )
}

export default ChangePassword

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
    },
})
