import React, { PureComponent } from 'react';
import { View, FlatList,Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import Product from 'src/screens/list/Product';
import { mapDispatchToProps } from 'src/actions';
import Resume from './Resume';

class Cart extends PureComponent {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        headerTitle: 'Panier',
        
        headerStyle: {
            backgroundColor: '#f4511e',
          }
    }

    onKeyExtractor = (item, index) => index.toString();

    UNSAFE_componentWillMount(){
        console.warn("xxxxxxxxxcxxxxxx");
        console.log("loglogloglogloglogloglog");
        //alert('ok');
        console.warn(this.props.cartReducers) 
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                <Resume />
                <FlatList
                    keyExtractor={this.onKeyExtractor}
                    data={this.props.cartReducers}
                    renderItem={(data) =>
                        <Product
                            detail={data.item}
                            onAddProduct={this.props.addProduct}
                            onRemoveProduct={this.props.removeProduct}
                            showDetails
                        />}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { cartReducers } = state
    return { cartReducers }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Cart));
