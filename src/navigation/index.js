import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProductList from 'src/screens/list';
import Cart from 'src/screens/cart';

const routeNavigator = {
    List: {
        screen: ProductList
    },
    Cart: {
        screen: Cart
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