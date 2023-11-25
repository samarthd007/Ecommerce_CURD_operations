import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Main from './Main'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { StripeProvider } from '@stripe/stripe-react-native'

const stripeKey =
    'pk_test_51OEsCfSIo0XFyMJThrSr3nspWiKkSVGr7gXtTNOwUczZwwqPfRGfflSKha4AWn8nd9bFkkGwjcmBYA5xLb1fMmrZ00ChBR2qa9'
export default function App() {
    return (
        <StripeProvider
            merchantIdentifier="Samarth-D-Valmiki"
            threeDSecureParams={{
                backgroundColor: 'white',
                timeout: 5,
            }}
            publishableKey={stripeKey}
        >
            <Provider store={store}>
                <Main />
            </Provider>
        </StripeProvider>
    )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
