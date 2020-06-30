import { StyleSheet } from 'react-native';

export const productStyles = StyleSheet.create({
    title: {
        left: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    price: {
        left: 10,
    },
    icon: {
        color: 'black',
        backgroundColor: 'rgba(255,255,255,0)',
        left: 5
    },
    mainContainer: {
        marginTop: 5,
        padding: 10
    },
    productContainer: {
        flexDirection: 'row',
        backgroundColor: '#c5c5c5',
        flex: 1
    },
    nameAndPriceContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1
    }
});

export const cartIconStyles = StyleSheet.create({
    badgeStyle: {
        color: 'white'
    },
    badgeContainerStyle: {
        backgroundColor: '#8FBC8B'
    }
});

export const productListStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'gray'
    }
});