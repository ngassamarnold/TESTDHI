import React, { PureComponent } from 'react';
import { View,TextInput,Text ,Button} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { mapDispatchToProps } from 'src/actions';
import {loadProducts,insertCMD,CountryWorker} from '../../service/service'

import { orders } from 'src/assets/styles';



const json =  CountryWorker.getAllCountries();


class Oders extends PureComponent {
    static navigationOptions = {
        headerTitle: 'Commande',
        headerStyle: {
            backgroundColor: '#f4511e',
          }
    }

    constructor(props) {
        super(props);
        this.state={
            nom:"",
            prenom:"",
            telephone:"",
            isloading:false
        },
        this.price= this.props.navigation.getParam('price', null)
    }

    //inserer la commande sur le serveur
    insertCmd(cmd,obj){
        insertCMD(cmd) 
            .then((response) =>{// response.json()
            this.DemandPaie(obj);
                console.warn(response["data"].status)
            })
            .catch((error) => {
            //console.error(error);
            alert('Vérifiez votre connexion internet')
            }); 

    }
    //Pour demander un paiement 
    DemandPaie(obj){
      //  console.warn(obj)
        //alert(obj.app_transaction_ref)
        loadProducts(obj) 
            .then((response) =>{// response.json()
               // alert(response["data"].payment_url)
                this.props.navigation.navigate('Paiement',{'url':response["data"].payment_url}); 
               // this.insertCmd(cmd);
                //alert(response) 
                console.warn(response["data"].status)
            })
            .catch((error) => {
            //console.error(error);
            alert('Vérifiez votre connexion internet')
            });
      
    }

//   async  produit(){
//         let rest=[];
//         await   products().then(res=>{
//            // console.warn(res)
//            rest.push(res)
//         })
//         return rest

//     }

    UNSAFE_componentWillMount(){
        console.warn(this.props.cartReducers)
        console.warn('les produits api');
        // products().then(res=>{
        //     console.warn(res)
        // })
        //console.warn(products());
        // console.warn(Object.values(json)[2] )
        // let res= Object.values(json)[2]

        // res.forEach(element => {
        //     alert(element.nom)
        // });
    }

    //Génerer la ref de la transaction
     makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    sendData(){
        if(this.state.nom!=='' && this.state.telephone!==''){
            if(this.state.telephone.length<9){
                alert('Le numéro doit avoir 9 chiffres');
            }
            else if(this.state.telephone.length>9){
                alert('Le numéro doit avoir 9 chiffres');
            }
            else{
                alert(this.price)
               let obj= { }
               obj.transaction_amount=this.price;
               obj.transaction_reason="Achat de produit";
               obj.customer_lang='fr';
               obj.app_transaction_ref=this.makeid(32);

               let commande={}
               commande.nom_utilisateur=this.state.nom;
               commande.telephone=this.state.telephone;
               commande.liste_commande=this.props.cartReducers;
               commande.reference=this.makeid(32);
               //this.DemandPaie(obj,commande);
               this.insertCmd(commande,obj)

               //this.insertCmd(commande);
             
              // loadProducts(obj).then()
            }
        }
        else {
            alert("Entrez le nom et le télephone");
        }

       
    }

    /**
     * Fonction pour contrôler le champs prix
     */
    onChanged(text){ 

        var newText = ''; 
        var numbers = '0123456789'; 
        if(text.length < 1){ 
            this.setState({ telephone: '' }); 
        } 
        for (var i=0; i < text.length; i++) { 
            if(numbers.indexOf(text[i]) > -1) { 
                newText = newText + text[i]; 
            } 
            this.setState({ telephone: newText }); 
        } 
    } 

    onKeyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={orders.section}>
                {/* <View style={orders.textView}>

                  <Text style={orders.Text}>cscdc</Text>
                </View> */}
                <View style={orders.textView}>
                        <Text style={orders.label}> Votre nom</Text>
                        <TextInput
                            onChangeText={(nom) => this.setState({nom})}
                            style={{ height: 40, width: "95%", borderColor: 'gray', borderWidth: 1,  marginBottom: 20 }}
                            placeholder="votre nom"
                            underlineColorAndroid="transparent"
                            />
                </View>
                <View style={orders.textView}>
                        <Text style={orders.label}> Votre Télephone</Text>
                        <TextInput
                            keyboardType='numeric'
                            style={orders.textInput} 
                            onChangeText={(text) => this.onChanged(text)}
                            style={{ height: 40, width: "95%", borderColor: 'gray', borderWidth: 1,  marginBottom: 20 }}
                            placeholder="Votre télephone"
                            underlineColorAndroid="transparent"
                            />
                </View>
                <View style={{alignItems: 'center', marginTop: 10}}>
                <Button
                    title="Envoyer"
                    color="#f4511e"
                    onPress={() => {this.sendData()}}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { productsReducers, cartReducers } = state
    return { productsReducers, cartReducers }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Oders));
