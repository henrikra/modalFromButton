import React, {Component} from 'react';
import {View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  PanResponder,
} from 'react-native';

class ButtonToModal extends Component {
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: ({nativeEvent}, gestureState) => {
        this.props.onPress({
          top: gestureState.y0 - nativeEvent.locationY,
          left: this.state.pageX,
          width: this.state.originalWidth,
          height: this.state.originalHeight,
        });
      },
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.button.measure((x, y, width, height, pageX, pageY) => {
        this.setState({
          originalWidth: width,
          originalHeight: height,
          pageX,
          pageY,
          x,
          y
        });
      });
    }, 0);
  }
  
  render() {
    return (
      <View style={styles.container} ref="button" {...this._panResponder.panHandlers}>
        <TouchableOpacity style={styles.pressableArea} onPress={this.onPress}>
          <Text style={styles.text}>SEE DETAILS</Text>
        </TouchableOpacity>
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
});

export default ButtonToModal;