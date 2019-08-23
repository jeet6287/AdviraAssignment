import React, {Component} from 'react';
import {View,Text,StatusBar,StyleSheet} from 'react-native';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import reducers from './src/reducers';
import MealsData from './src/components/mealDetails';

const store = createStore(reducers,applyMiddleware(ReduxThunk)); 

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class App extends Component{
  render(){
    return(
      <Provider store = {store}>
       <View style={{flex:1}}>
        <MyStatusBar backgroundColor="#cfccc6" barStyle="light-content" />
        <MealsData /> 
       </View>
     </Provider>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: getStatusBarHeight(),
  }
});

export default App; 
