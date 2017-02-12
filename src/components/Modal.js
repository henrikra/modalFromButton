import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity} from 'react-native';

class Modal extends Component {
  state = {
    animatedValue: new Animated.Value(0),
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('update');
    this.state.animatedValue.setValue(0);
    Animated.timing(this.state.animatedValue, {toValue: 1, duration: 2000}).start();
  }
  
  close = () => {
    Animated.timing(this.state.animatedValue, {toValue: 0, duration: 2000}).start();
  }
  
  render() {
    const {top, left, width, height} = this.props;
    return (
      <Animated.View
        style={[
          styles.container, 
          {
            top: this.state.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [top, 0],
            }), 
            left: this.state.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [left, 0],
            }), 
            width: this.state.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [width, Dimensions.get('window').width],
            }), 
            height: this.state.animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [height, Dimensions.get('window').height],
            }),
          },
        ]}
      >
        <Text>Modal</Text>
        <TouchableOpacity style={styles.close} onPress={this.close} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    position: 'absolute',
  },
  close: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
  },
});

export default Modal;