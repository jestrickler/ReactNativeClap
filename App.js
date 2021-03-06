import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import ClapButton from './components/ClapButton'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <ClapButton/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDDDFF',
  },
});
