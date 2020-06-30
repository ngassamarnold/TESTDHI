import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { Card } from 'react-native-elements';
import { fixedNumber } from 'src/providers/helpers';

class Resume extends PureComponent {
    constructor(props) {
        super(props);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.calculateAmount = this.calculateAmount.bind(this);
    }

    calculateAmount = () => {
        var total = 0.0;
        this.props.cartReducers.forEach((product) => {
            total += product.price * product.quantity;
        });
        return fixedNumber(total);
    }

    calculateTotal = () => {
        var total = 0;
        this.props.cartReducers.forEach((product) => {
            total += product.quantity;
        });
        return total;
    }


    render() {
        return (
            <Card title="Your cart">
                <Text style={{ padding: 5 }}>Total products: {this.calculateTotal()}</Text>
                <Text style={{ padding: 5 }}>Total amount: ${this.calculateAmount()}</Text>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { cartReducers } = state
    return { cartReducers }
}

export default connect(mapStateToProps)(withNavigation(Resume));
