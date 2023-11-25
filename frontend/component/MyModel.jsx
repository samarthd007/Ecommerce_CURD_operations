import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { Avatar, Button } from 'react-native-paper'

const MyModel = ({ _id, deleteProductHandler, navigate, setOpenModel }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ position: 'absolute', top: 10, right: 10 }}
                onPress={() => setOpenModel((prev) => !prev)}
            >
                <Avatar.Icon
                    icon={'close'}
                    size={25}
                    style={{ backgroundColor: Colors.color1 }}
                />
            </TouchableOpacity>
            <Text
                style={styles.text}
                onPress={() => navigate.navigate('updateproduct', { _id })}
            >
                Edit
            </Text>
            <Button
                textColor={Colors.color1}
                onPress={() => deleteProductHandler(_id)}
            >
                Delete
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        zIndex: 100,
        backgroundColor: Colors.color2,
        padding: 20,
        borderRadius: 10,
        elevation: 4,
    },
    text: {
        fontWeight: '900',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
})

export default MyModel
