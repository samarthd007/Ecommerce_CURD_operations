import { View, Text, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import ProductDetails from './screens/ProductDetails'
import Toast from 'react-native-toast-message'
import Cart from './screens/Cart'
import ConfirmOrder from './screens/ConfirmOrder'
import Payment from './screens/Payment'
import Login from './screens/Login'
import ForgotPassword from './screens/ForgotPassword'
import Verify from './screens/Verify'
import SignUp from './screens/SignUp'
import Profile from './screens/Profile'
import UpdateProfile from './screens/UpdateProfile'
import ChangePassword from './screens/ChangePassword'
import Orders from './screens/Orders'
import AdminPanel from './screens/Admin/AdminPanel'
import Categories from './screens/Admin/Categories'
import AdminOrders from './screens/Admin/AdminOrders'
import UpdateProduct from './screens/Admin/UpdateProduct'
import NewProduct from './screens/Admin/NewProduct'
import ProductImages from './screens/Admin/ProductImages'
import CameraComponent from './screens/Camera'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './redux/actions/userAction'
import OrderPlaced from './screens/OrderPlaced'
import GetDetail from './screens/GetDetail'

const stack = createNativeStackNavigator()

const Main = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    return (
        <NavigationContainer>
            <stack.Navigator
                initialRouteName="home"
                screenOptions={{ headerShown: false }}
            >
                <stack.Group>
                    <stack.Screen name="home" component={Home} />

                    <stack.Screen
                        name="productdetails"
                        component={ProductDetails}
                    />
                    <stack.Screen name="cart" component={Cart} />
                    <stack.Screen
                        name="confirmorder"
                        component={ConfirmOrder}
                    />
                    <stack.Screen name="payment" component={Payment} />
                    <stack.Screen name="login" component={Login} />
                    <stack.Screen
                        name="forgotpassword"
                        component={ForgotPassword}
                    />
                    <stack.Screen name="verify" component={Verify} />
                    <stack.Screen name="signup" component={SignUp} />

                    <stack.Screen name="profile" component={Profile} />

                    <stack.Screen
                        name="changepassword"
                        component={ChangePassword}
                    />
                    <stack.Screen
                        name="updateprofile"
                        component={UpdateProfile}
                    />
                    <stack.Screen name="orders" component={Orders} />

                    <stack.Screen name="adminpanel" component={AdminPanel} />

                    <stack.Screen name="categories" component={Categories} />

                    <stack.Screen name="adminorders" component={AdminOrders} />

                    <stack.Screen
                        name="updateproduct"
                        component={UpdateProduct}
                    />
                    <stack.Screen name="newproduct" component={NewProduct} />

                    <stack.Screen
                        name="productimages"
                        component={ProductImages}
                    />

                    <stack.Screen name="camera" component={CameraComponent} />

                    <stack.Screen name="orderplaced" component={OrderPlaced} />

                    <stack.Screen name="getdetail" component={GetDetail} />
                </stack.Group>
            </stack.Navigator>
            <Toast position="top" topOffset={40} />
        </NavigationContainer>
    )
}

export default Main
