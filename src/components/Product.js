import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import ButtonToModal from './ButtonToModal';

const randomIntegerBetween = (from, to) => Math.floor(Math.random() * to) + from
const getRandomImage = () => 
  `https://unsplash.it/30${randomIntegerBetween(0, 9)}/25${randomIntegerBetween(0, 9)}`

class Product extends Component {
  render() {
    const {onPress, title} = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: getRandomImage()}} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <ButtonToModal onPress={onPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 150,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  }
});

export default Product;