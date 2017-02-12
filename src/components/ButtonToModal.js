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
  state = {
    isModalOpen: false,
    animatedValue: new Animated.Value(0),
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: ({nativeEvent}, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.log('päästi irti', nativeEvent.pageY);
        this.props.onPress({
          top: gestureState.y0 - nativeEvent.locationY,
          left: this.state.pageX,
          width: this.state.originalWidth,
          height: this.state.originalHeight,
        });
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
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
  
  
  onPress = () => {
    const {isModalOpen, animatedValue} = this.state;
    // Animated.timing(animatedValue, {toValue: isModalOpen ? 0 : 1}).start();
    // this.setState({isModalOpen: !isModalOpen});
    console.log('pageY measure', this.state.pageY);
    
  }
  
  render() {
    return (
      <View style={styles.container} ref="button" {...this._panResponder.panHandlers}>
        <TouchableOpacity style={styles.pressableArea} onPress={this.onPress}>
          <Text style={styles.text}>SEE DETAILS</Text>
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
                inputRange: [0, 0.01],
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
  }
});

export default ButtonToModal;