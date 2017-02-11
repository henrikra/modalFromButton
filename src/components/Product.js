import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import ButtonToModal from './ButtonToModal';

const randomIntegetBetween = (from, to) => Math.floor(Math.random() * to) + from
const getRandomImage = () => `https://unsplash.it/30${randomIntegetBetween(0, 9)}/25${randomIntegetBetween(0, 9)}`

const Product = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: getRandomImage()}} />
      <View style={styles.content}>
        <Text>Product</Text>
        <ButtonToModal />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    backgroundColor: '#ffffff',
  },
  image: {
    flex: 1,
    height: 100,
  },
  content: {
    padding: 15,
  },
});

export default Product;