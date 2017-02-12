import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, PanResponder, TouchableOpacity} from 'react-native';

class Product extends Component {
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: ({nativeEvent}) => {
        this.props.onPress({
          top: nativeEvent.pageY - nativeEvent.locationY,
          left: this.state.pageX,
          width: this.state.width,
          height: this.state.height,
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
          width,
          height,
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
          <View style={styles.button} ref="button" {...this.panResponder.panHandlers}>
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2ecc71',
  },
  pressableArea: {
    paddingVertical: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Product;