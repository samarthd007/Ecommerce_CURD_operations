import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../styles/Styles'
import { PieChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('screen').width

const Chart = ({ inStock = 0, outOfStock = 0 }) => {
    const data = [
        {
            name: 'out of Stock',
            population: outOfStock,
            color: Colors.color1_light,
            legendFontColor: Colors.color2,
        },
        {
            name: ' In Stock',
            population: inStock,
            color: Colors.color1_light1,
            legendFontColor: Colors.color2,
        },
    ]
    const chartConfig = {
        color: (opacity = 1) => `rgba(26,255,146,${opacity})`,
    }
    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                backgroundColor={Colors.color3}
                paddingLeft="15"
                center={[10.15]}
                absolute
            />
        </View>
    )
}

export default Chart

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const StockChart = ({ inStock, outStock }) => {
    const totalStock = inStock + outStock
    const inStockPercentage = (inStock / totalStock) * 100
    const outStockPercentage = (outStock / totalStock) * 100

    return (
        <View style={styles.container}>
            <View style={[styles.bar, { height: inStockPercentage + '%' }]}>
                <Text style={styles.barText}>{inStock}</Text>
            </View>
            <View style={[styles.bar, { height: outStockPercentage + '%' }]}>
                <Text style={styles.barText}>{outStock}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 200,
        paddingHorizontal: 20,
    },
    bar: {
        flex: 1,
        backgroundColor: '#4CAF50', // Green for inStock, you can customize the color
        marginHorizontal: 5,
        borderRadius: 5,
        justifyContent: 'flex-end',
    },
    barText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        paddingVertical: 5,
    },
})
