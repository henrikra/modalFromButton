import React, {Component} from 'react';
import {View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  TouchableOpacity,
  Image,
} from 'react-native';

const animationStates = {
  hidden: 0,
  start: 1,
  end: 2,
};

class Modal extends Component {
  state = {
    animatedValue: new Animated.Value(0),
  }
  
  componentDidUpdate(prevProps, prevState) {
    this.state.animatedValue.setValue(animationStates.start);
    Animated.timing(this.state.animatedValue, {toValue: animationStates.end, duration: 500}).start();
  }
  
  close = () => {
    Animated.timing(this.state.animatedValue, {toValue: animationStates.start, duration: 500}).start(() => {
      this.state.animatedValue.setValue(animationStates.hidden);
    });
  }
  
  render() {
    const {top, left, width, height} = this.props;
    const deviceWidth = Dimensions.get('window').width;
    return (
      <Animated.View
        style={[
          styles.container, 
          {
            top: this.state.animatedValue.interpolate({
              inputRange: [animationStates.hidden, animationStates.start, animationStates.end],
              outputRange: [-deviceWidth * 2, top, 0],
            }), 
            left: this.state.animatedValue.interpolate({
              inputRange: [animationStates.start, animationStates.end],
              outputRange: [left, 0],
            }), 
            width: this.state.animatedValue.interpolate({
              inputRange: [animationStates.start, animationStates.end],
              outputRange: [width, deviceWidth],
            }), 
            height: this.state.animatedValue.interpolate({
              inputRange: [animationStates.start, animationStates.end],
              outputRange: [height, Dimensions.get('window').height],
            }),
            backgroundColor: this.state.animatedValue.interpolate({
              inputRange: [animationStates.start, animationStates.end],
              outputRange: ['rgb(46, 204, 113)', 'rgba(44, 62, 80, 0.95)'],
            }),
          },
        ]}
      >
        <View style={styles.navigation}>
          <TouchableOpacity onPress={this.close}>
            <Text style={styles.back}>Back</Text>
          </TouchableOpacity>
        </View>
        <Image style={styles.image} source={{uri: 'https://unsplash.it/300/250'}} />
        <Animated.View style={[styles.content, {opacity: this.state.animatedValue}]}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.description}>Tincidunt leo ullamco. Incididunt et litora tempus.
Imperdiet libero minim magna. Cupidatat venenatis nunc duis. Adipiscing in cubilia.
Conubia minim. Fusce aliquip malesuada. Sapien enim dolore.
</Text>
          <Text style={styles.price}>$560</Text>
          <Text style={styles.priceIncluding}>includes two way flights and hotel</Text>
          <TouchableOpacity style={styles.button} onPress={this.close}>
            <Text style={styles.buttonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    position: 'absolute',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  navigation: {
    marginTop: 20,
    padding: 15,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  back: {
    color: '#2ecc71',
  },
  price: {
    fontSize: 32,
    fontWeight: '500',
    color: '#ffffff',
    marginTop: 15,
  },
  priceIncluding: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 15,
  }
});

export default Modal;