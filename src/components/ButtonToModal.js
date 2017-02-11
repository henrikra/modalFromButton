import React, {Component} from 'react';
import {View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
} from 'react-native';

class ButtonToModal extends Component {
  state = {
    isModalOpen: false,
    animatedValue: new Animated.Value(0),
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.button.measure((x, y, width, height, pageX, pageY) => {
        this.setState({
          originalWidth: width,
          originalHeight: height,
          pageX,
          pageY,
        });
      });
    }, 0);
  }
  
  
  onPress = () => {
    const {isModalOpen, animatedValue} = this.state;
    Animated.timing(animatedValue, {toValue: isModalOpen ? 0 : 1}).start();
    this.setState({isModalOpen: !isModalOpen});
  }
  
  render() {
    return (
      <View style={styles.container} ref="button">
        <TouchableOpacity style={styles.pressableArea} onPress={this.onPress}>
          <Text style={styles.text}>OPEN MODAL</Text>
        </TouchableOpacity>
        <Animated.View 
          style={[
            styles.modal,
            {
              width: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.originalWidth, Dimensions.get('window').width],
              }),
              height: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.originalHeight, Dimensions.get('window').height],
              }),
              backgroundColor: this.state.animatedValue.interpolate({
                inputRange: [0, 0.1],
                outputRange: ['rgba(46, 204, 113, 0)', 'rgba(46, 204, 113, 1)']
              }),
              left: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -this.state.pageX]
              }),
              top: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -this.state.pageY]
              }),
            }
          ]} 
          pointerEvents="none" 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2ecc71',
  },
  pressableArea: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  text: {
    color: '#ffffff',
    fontWeight: '500',
  },
  modal: {
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    top: 0,
    // right: 0,
    // bottom: 0,
  }
});

export default ButtonToModal;