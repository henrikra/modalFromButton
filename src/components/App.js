import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Product from './Product';
import Modal from './Modal';
import mockDeals from '../mockDeals';

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
          <Text style={styles.welcome}>Hotel deals</Text>
          {mockDeals.map((deal, index) => <Product key={index} onPress={this.onPress} {...deal} />)}
        </ScrollView>
        <Modal {...this.state} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  products: {
    padding: 20,
    overflow: 'visible',
  },
});

export default App;
