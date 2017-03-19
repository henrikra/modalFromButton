import React, {Component} from 'react';
import {View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
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
    this.animateTo(animationStates.end).start();
  }

  animateTo = toValue => Animated.timing(this.state.animatedValue, {toValue, duration: 500})
  
  close = () => {
    this.animateTo(animationStates.start).start(() => {
      this.state.animatedValue.setValue(animationStates.hidden);
    });
  }
  
  render() {
    const {top, left, width, height} = this.props;
    const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');

    return (
      <Animated.View
        style={[
          styles.container, 
          {
            top: this.state.animatedValue.interpolate({
              inputRange: [animationStates.hidden, animationStates.start, animationStates.end],
              outputRange: [-deviceWidth * 3, top, 0],
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
              outputRange: [height, deviceHeight],
            }),
            backgroundColor: this.state.animatedValue.interpolate({
              inputRange: [animationStates.start, animationStates.end],
              outputRange: ['rgb(46, 204, 113)', 'rgba(44, 62, 80, 0.95)'],
            }),
          },
        ]}
      >
        <Animated.View style={{
          flex: 1,
          opacity: this.state.animatedValue.interpolate({
            inputRange: [animationStates.start, animationStates.start + 0.5, animationStates.end],
            outputRange: [0, 0, 1],
          }),
        }}>
          <ScrollView>
            <View style={styles.navigation}>
              <TouchableOpacity onPress={this.close}>
                <Text style={styles.back}>Back</Text>
              </TouchableOpacity>
            </View>
            <Image style={styles.image} source={{uri: this.props.image}} />
            <View style={styles.body}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.description}>Tincidunt leo ullamco. Incididunt et litora tempus. Imperdiet libero minim magna. Cupidatat venenatis nunc duis. Adipiscing in cubilia. Conubia minim. Fusce aliquip malesuada. Sapien enim dolore.</Text>
              <Text style={styles.price}>${this.props.price}</Text>
              <Text style={styles.priceIncluding}>includes two way flights and hotel</Text>
              <TouchableOpacity style={styles.button} onPress={this.close}>
                <Text style={styles.buttonText}>ADD TO CART</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  }
}

Modal.defaultProps = {
  top: 0,
  left: 0,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: 250,
  },
  body: {
    padding: 20,
    marginBottom: 25,
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
    marginTop: Platform.OS === 'ios' ? 20 : 0,
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
    padding: 15,
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