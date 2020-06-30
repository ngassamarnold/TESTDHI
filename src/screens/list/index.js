import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { mapDispatchToProps } from 'src/actions';
import Product from 'src/screens/list/Product';
import CartIcon from 'src/screens/list/CartIcon';
import { productListStyles } from 'src/assets/styles';

class ProductList extends PureComponent {
    static navigationOptions = {
        headerTitle: 'Shopping cart!!',
        headerRight: (
            <CartIcon />
        )
    }

    constructor(props) {
        super(props);
    }

    onKeyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={productListStyles.mainContainer}>
                <FlatList
                    keyExtractor={this.onKeyExtractor}
                    data={this.props.productsReducers}
                    renderItem={(data) =>
                        <Product
                            detail={data.item}
                            onAddProduct={this.props.addProduct}
                            onRemoveProduct={this.props.removeProduct}
                        />}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { productsReducers, cartReducers } = state
    return { productsReducers, cartReducers }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ProductList));
