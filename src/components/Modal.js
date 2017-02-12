import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity} from 'react-native';

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
              outputRange: [-deviceWidth, top, 0],
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
          },
        ]}
      >
        <Animated.View style={[styles.content, {opacity: this.state.animatedValue}]}>
          <Text>Modal</Text>
          <TouchableOpacity style={styles.close} onPress={this.close} />
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2ecc71',
    position: 'absolute',
    overflow: 'hidden',
  },
  close: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
  },
});

export default Modal;