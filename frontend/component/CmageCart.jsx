import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { Avatar } from 'react-native-paper'

const CmageCard = ({ src, _id, key, deleteHandler }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: src }}
                style={{ width: '100%', height: '80%', resizeMode: 'contain' }}
            />
            <TouchableOpacity style={{}} onPress={() => deleteHandler(_id)}>
                <Avatar.Icon
                    size={30}
                    icon={'delete'}
                    style={{ backgroundColor: Colors.color1 }}
                />
            </TouchableOpacity>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.color2,
        elevation: 5,
        margin: 10,
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
        height: 300,
    },
})

export default CmageCard
