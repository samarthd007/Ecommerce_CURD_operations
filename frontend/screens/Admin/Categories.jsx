import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors, defaultStyle, inputStyling } from '../../styles/Styles'
import Header from '../../component/Header'
import CategoryCard from '../../component/CategoryCard'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Button, TextInput } from 'react-native-paper'
import {
    useMessageAndErrorAddCategory,
    useSetCategories,
} from '../../utils/hooks'
import { useDispatch } from 'react-redux'
import { addCategory, deleteCategory } from '../../redux/actions/otherAction'

const Categories = () => {
    const dispatch = useDispatch()
    const navigate = useNavigation()
    const isFocused = useIsFocused()
    const [category, setCategory] = useState('')

    const [categories, setCategories] = useState([])

    useSetCategories(setCategories, isFocused)

    const loading = useMessageAndErrorAddCategory(dispatch, 'adminpanel')

    const deleteCategory2 = (id) => {
        dispatch(deleteCategory(id))
    }

    const submitHandler = () => {
        dispatch(addCategory(category))
    }
    return (
        <View style={{ ...defaultStyle, backgroundColor: Colors.color5 }}>
            {/* Heading */}

            <Header back={true} />

            <View
                style={{
                    marginBottom: 20,
                    paddingTop: 70,
                }}
            >
                <Text style={styles.heading}>Categories</Text>
            </View>
            <ScrollView style={{ marginBottom: 20 }}>
                <View
                    style={{
                        backgroundColor: Colors.color2,
                        padding: 20,
                        minHeight: 400,
                    }}
                >
                    {categories.map((i) => (
                        <CategoryCard
                            name={i.category}
                            _id={i._id}
                            key={i._id}
                            deletehandler={deleteCategory2}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.container}>
                <TextInput
                    style={inputStyling}
                    mode={'outlined'}
                    activeOutlineColor={Colors.color1}
                    placeholder="Category"
                    value={category}
                    onChangeText={setCategory}
                />
                <Button
                    textColor={Colors.color2}
                    disabled={!category}
                    onPress={() => submitHandler()}
                    loading={loading}
                >
                    Add
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        padding: 10,
        backgroundColor: Colors.color3,
        color: Colors.color2,
        borderRadius: 5,
    },
    container: {
        padding: 20,
        backgroundColor: Colors.color3,
        borderRadius: 10,
        elevation: 10,
    },
    forget: {
        color: Colors.color2,
        marginHorizontal: 20,
        marginVertical: 10,
        alignSelf: 'flex-end',
        fontWeight: '400',
    },
    btn: {
        backgroundColor: Colors.color1,
        margin: 20,
        padding: 6,
    },
    or: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '100',
        color: Colors.color2,
        fontWeight: '100',
    },
    link: {
        alignSelf: 'center',
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20,
        color: 'white',
    },
})

export default Categories
