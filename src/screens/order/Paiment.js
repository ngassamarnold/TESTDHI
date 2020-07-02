import React, { Component } from 'react';
import { WebView } from 'react-native';
import { connect } from 'react-redux';



export default class Paiement  extends Component {
  static navigationOptions = {
    headerTitle: 'Paiement',
    headerStyle: {
        backgroundColor: '#f4511e',
      }
}
constructor(props) {
    super(props);
    this.state={
       
    },
    this.url= this.props.navigation.getParam('url', null)
}
  render() {
    return (
      <WebView
        source={{
          uri: this.url
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

