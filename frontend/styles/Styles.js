import { Platform, StatusBar, StyleSheet } from 'react-native'

export const Colors = {
    color1: '#c70049',
    color1_light: 'rgba(227,25,99,1)',
    color1_light1: 'rgba(199,0,73,0.8)',
    color2: 'white',
    color3: 'rgb(45,45,45)',
    color4: 'transparent',
    color5: '#f2f2f2',
    color6: '#f7f7f7',
    color_back_red: 'rgb(161, 13, 13)',
}

export const defaultStyle = StyleSheet.create({
    padding: 35,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 70,
    flex: 1,
    backgroundColor: Colors.color2,
})

export const inputStyling = StyleSheet.create({
    height: 50,
    backgroundColor: Colors.color2,
    marginVertical: 10,
    marginHorizontal: 20,
})
