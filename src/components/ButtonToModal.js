import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class ButtonToModal extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.pressableArea}>
          <Text style={styles.text}>OPEN MODAL</Text>
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