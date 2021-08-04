import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Caption, Card, Title, Paragraph, Text } from 'react-native-paper';

const CardWithButton = ({ title, desc, buttonAction, buttonText }) => {
    return (
        <Card style={styles.card}>
            <View style={styles.cardRow}>
                <View style={styles.cardColumn}>
                    <Title>{title}</Title>
                    <Paragraph>{desc}</Paragraph>
                </View>

                <Button
                    mode="contained"
                    onPress={buttonAction}
                    style={styles.button}
                >{buttonText}</Button>
            </View>
        </Card>
    )
}

export default CardWithButton;

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20.0,
        marginVertical: 8.0,
        elevation: 10.0,
        color: 'white',
        paddingHorizontal: 20.0,
        paddingVertical: 4.0,
    },
    cardColumn: {
        flexDirection: 'column',
        flex: 0.85,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        height: 50.0,
    }
});
