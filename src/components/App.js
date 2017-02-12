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
    title: 'Hotel Jeilou'
  }, 
  {
    title: 'Hotel functionalen'
  }, 
  {
    title: 'Native Hotel'
  }, 
  {
    title: 'Yellow rose hotel'
  }, 
  {
    title: 'Foodoraas Hotel'
  }, 
  {
    title: 'Wolt Hotel'
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
