import React, { PureComponent } from 'react';
import { Text,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { Card } from 'react-native-elements';
import { fixedNumber } from 'src/providers/helpers';
import Icon from 'react-native-vector-icons/Ionicons';



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
            <Card title="Votre Panier">
                <Text style={{ padding: 5 }}>Total produits: {this.calculateTotal()}</Text>
                <Text style={{ padding: 5 }}>Total prix: {this.calculateAmount()} ƒcfa</Text>
                {this.calculateTotal()?( 
                   <TouchableOpacity  onPress={()=> {
                    this.props.navigation.navigate('Order',{'price':this.calculateAmount()}); 
                   }}>

                 <Text style={{ padding: 5 }}>Valider la commande (cliquez ici!!)</Text>
                  </TouchableOpacity> 
                ):<TouchableOpacity  onPress={()=> {
                    this.props.navigation.navigate('List'); 

            }}>
                 {/* <Icon name='ios-done-all' size={20} /> */}

                 <Text style={{ padding: 5 }}>Ajouter les produits au panier afin de passer votre commande</Text>
            </TouchableOpacity>}
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { cartReducers } = state
    return { cartReducers }
}

export default connect(mapStateToProps)(withNavigation(Resume));
