import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProductList from 'src/screens/list';
import Cart from 'src/screens/cart';
import Order from 'src/screens/order';
import Paiement  from '../screens/order/Paiment'


const routeNavigator = {
    List: {
        screen: ProductList
    },
    Cart: {
        screen: Cart
    },
    Order: {
        screen: Order
    },
    Paiement: {
        screen: Paiement
    },
};

const configNavigator = {
    transitionConfig: () => (
        {
            transitionSpec: {
                duration: 150,
            }
        }
    )
};

export default MainNavigator = createStackNavigator(routeNavigator, configNavigator);