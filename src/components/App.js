import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Product from './Product';
import Modal from './Modal';

const deals = [
  {
    title: 'Hotel Jeilou',
    price: 560,
  }, 
  {
    title: 'Hotel functionalen',
    price: 320,
  }, 
  {
    title: 'Native Hotel',
    price: 5300,
  }, 
  {
    title: 'Yellow rose hotel',
    price: 50,
  }, 
  {
    title: 'Foodoraas Hotel',
    price: 630,
  }, 
  {
    title: 'Wolt Hotel',
    price: 990,
  }
];

class App extends Component {
  state = {
    top: 0,
    left: 0,
    title: '',
  }

  onPress = newState => {
    this.setState(newState);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.products}>
          <Text style={styles.welcome}>
            Last minute travel deals
          </Text>
          {deals.map((deal, index) => <Product key={index} onPress={this.onPress} {...deal} />)}
        </ScrollView>
        <Modal {...this.state} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  products: {
    padding: 20,
    overflow: 'visible',
  },
});

export default App;
