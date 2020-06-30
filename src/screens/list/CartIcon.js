import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Badge } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
import { cartIconStyles } from 'src/assets/styles';

const CartIcon = (props) => (
    <View style={{ padding: 5, flexDirection: 'row' }}>
        <Badge value={calculateTotal(props.cartReducers)} textStyle={cartIconStyles.badgeStyle} containerStyle={cartIconStyles.badgeContainerStyle} />
        <Icon name='ios-cart' size={20} onPress={() => onClickCart(props)} />
    </View>
)

const calculateTotal = (list) => {
    var total = 0;
    list.forEach((product) => {
        total += product.quantity
    });
    return total;
}

const onClickCart = (props) => {
    props.navigation.navigate('Cart');
}

const mapStateToProps = (state) => {
    const { cartReducers } = state
    return { cartReducers }
}

export default connect(mapStateToProps)(withNavigation(CartIcon));
