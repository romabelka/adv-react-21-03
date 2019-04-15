import React from 'react';
import { StyleSheet} from 'react-native';
import AppNavigator from './components/app-navigator'
import {configure} from 'mobx'
import {Provider} from 'mobx-react'
import stores from './stores'

configure({
  enforceActions: 'always'
})

export default class App extends React.Component {
  render() {
    return <Provider {...stores}>
      <AppNavigator />
    </Provider>
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 100
  }
});
