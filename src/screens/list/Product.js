import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import { fixedNumber } from 'src/providers/helpers';
import { productStyles } from 'src/assets/styles';
import { connect } from 'react-redux';

const theme = getTheme();

class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.createButton = this.createButton.bind(this);
        this.createNameAndPrice = this.createNameAndPrice.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
    }

    onClickAdd = () => {
        this.props.onAddProduct(this.props.detail);
    }

    onClickRemove = () => {
        this.props.onRemoveProduct(this.props.detail);
    }

    showSubTotal = () => {
        if (this.props.showDetails) {
            return (
                <Text style={productStyles.price}>
                    Sous total: {fixedNumber(this.props.detail.price * this.props.detail.quantity)}ƒcfa
                </Text>
            );
        }
    }

    showQuantity = () => {
        if (this.props.showDetails) {
            return (
                <Text style={productStyles.price}>
                    Quantité.: {this.props.detail.quantity}
                </Text>
            );
        }
    }

    createButton = (icon, event) => {
        return (
            <TouchableWithoutFeedback
                onPress={event}
                style={{
                    alignSelf: "flex-end",
                    right: 10,
                }}
            >
                <Icon
                    name={icon}
                    size={40}
                />
            </TouchableWithoutFeedback>
        );
    }

    inCart = () => {
        var exists = false;
        this.props.cartReducers.forEach((product) => {
            if (product.name == this.props.detail.name) {
                exists = true;
            }
        });
        return exists;
    }

    setIconName = () => {
        return this.inCart() ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'
    }

    createNameAndPrice = () => {
        return (
            <View style={productStyles.nameAndPriceContainer}>
                <Text style={productStyles.title}>
                    {this.props.detail.name}
                </Text>
                <Text style={productStyles.price}>
                    Prix: {fixedNumber(this.props.detail.price)}ƒcfa
                </Text>
                <Text style={productStyles.price}>
                    Categorie: {this.props.detail.categorie}
                </Text>
                <Text style={productStyles.price}>
                    Quantité: {this.props.detail.quantite}
                </Text>
                {
                    this.showQuantity()
                }
                {
                    this.showSubTotal()
                }
            </View>
        );
    }

    render() {
        return (
            <View style={[theme.cardStyle, productStyles.mainContainer]}>
                <View style={productStyles.productContainer}>
                    <Icon
                        name={this.setIconName()}
                        size={30}
                        style={productStyles.icon}
                    />
                    {
                        this.createNameAndPrice()
                    }
                    {
                        this.createButton('ios-remove-circle', this.onClickRemove)
                    }
                    {
                        this.createButton('ios-add-circle', this.onClickAdd)
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { productsReducers, cartReducers } = state;
    return { productsReducers, cartReducers }
}

export default connect(mapStateToProps)(Product);
