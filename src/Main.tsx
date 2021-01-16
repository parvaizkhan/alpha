import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Main = () => {

    return (
        <View style={s.container}>
            <Text style={s.text}>{'Alpha'}</Text>
        </View>

    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: 'tomato'
    }
});

export default Main;