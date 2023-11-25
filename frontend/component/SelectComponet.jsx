import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Avatar, Headline } from 'react-native-paper'
import { Colors } from '../styles/Styles'

const SelectComponet = ({
    visible,
    setVisible,
    setCategory,
    setCategoryId,
    categories = [],
}) => {
    const selectedcategory = (i) => {
        setCategory(i.category)
        setCategoryId(i._id)
        setVisible(false)
    }
    return (
        visible && (
            <View
                style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    padding: 35,
                    borderRadius: 20,
                    width: '90%',
                    height: '90%',
                    alignSelf: 'center',
                    elevation: 5,
                    top: 50,
                }}
            >
                <TouchableOpacity onPress={() => setVisible(false)}>
                    <Avatar.Icon
                        icon={'close'}
                        size={30}
                        style={{
                            alignSelf: 'flex-end',
                            backgroundColor: Colors.color1,
                        }}
                    />
                </TouchableOpacity>
                <Headline
                    style={{
                        textAlign: 'center',
                        marginVertical: 10,
                        backgroundColor: Colors.color3,
                        borderRadius: 5,
                        padding: 3,
                        color: Colors.color2,
                    }}
                >
                    Select a Category
                </Headline>
                <ScrollView>
                    {categories.map((i) => (
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                marginVertical: 10,
                                textAlign: 'center',
                            }}
                            onPress={() => selectedcategory(i)}
                        >
                            {i.category}
                        </Text>
                    ))}
                </ScrollView>
            </View>
        )
    )
}

export default SelectComponet
