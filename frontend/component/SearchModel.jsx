import {
    View,
    Text,
    Platform,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    BackHandler,
} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../styles/Styles'
import { Avatar, Headline, Searchbar } from 'react-native-paper'

const SearchModel = ({
    searchQuery,
    setActiveSearch,
    setSearchQuery,
    setCategory,
    category,
    products = [],
}) => {
    const navigate = useNavigation()

    let temp = category
    setCategory('')

    const backAction = () => {
        setSearchQuery('')
        setActiveSearch(false)
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        }
    }, [])

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                zIndex: 100,
                backgroundColor: Colors.color2,
                padding: 35,
                paddingTop:
                    Platform.OS === 'android' ? StatusBar.currentHeight : 70,
            }}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setActiveSearch(false)
                    setSearchQuery('')
                }}
            >
                <Avatar.Icon
                    icon={'close'}
                    size={45}
                    color={Colors.color3}
                    style={{
                        backgroundColor: Colors.color2,
                        position: 'relative',
                        right: -290,
                    }}
                />
            </TouchableOpacity>
            <SafeAreaView>
                <Searchbar
                    placeholder="Search..."
                    onChangeText={(e) => setSearchQuery(e)}
                    style={{
                        marginTop: 10,
                    }}
                />

                <ScrollView>
                    <View
                        style={{
                            paddingVertical: 30,
                            paddingHorizontal: 10,
                        }}
                    >
                        {products.map((item) => (
                            <SearchItem
                                key={item._id}
                                imgSrc={item.images[0]?.url}
                                name={item.name}
                                price={item.price}
                                handler={() =>
                                    navigate.navigate('productdetails', {
                                        _id: item._id,
                                    })
                                }
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const SearchItem = ({ price, name, imgSrc, key, handler }) => (
    <TouchableOpacity onPress={handler} activeOpacity={0.8}>
        <View
            style={{
                padding: 20,
                borderRadius: 10,
                backgroundColor: Colors.color2,
                elevation: 5,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                marginVertical: 30,
            }}
        >
            <Image
                source={{
                    uri: imgSrc,
                }}
                style={{
                    width: 80,
                    height: 80,
                    position: 'absolute',
                    resizeMode: 'contain',
                    top: -10,
                    left: 10,
                    borderTopLeftRadius: 20,
                    borderBottomRightRadius: 20,
                }}
            />
            <View style={{ width: '80%', paddingHorizontal: 30 }}>
                <Text numberOfLines={1}>{name}</Text>
                <Headline numberOfLines={1} style={{ fontWeight: '900' }}>
                    {' '}
                    ₹{price}
                </Headline>
            </View>
        </View>
    </TouchableOpacity>
)

export default SearchModel
