import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, PanResponder, TouchableOpacity} from 'react-native';

class Product extends Component {
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
          title: this.props.title,
          price: this.props.price,
          image: this.props.image,
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
        });
      });
    }, 0);
  }

  render() {
    const {onPress, title, image} = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.button} ref="button" {...this._panResponder.panHandlers}>
            <TouchableOpacity style={styles.pressableArea} onPress={this.onPress}>
              <Text style={styles.buttonText}>SEE DETAILS</Text>
            </TouchableOpacity>
          </View>
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
  },
  button: {
    backgroundColor: '#2ecc71',
  },
  pressableArea: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default Product;