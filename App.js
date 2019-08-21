import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import UserPage from './src/components/userPage';

const store = createStore(reducers,applyMiddleware(ReduxThunk)); 

class App extends Component{
  render(){
    return(
      <Provider store = {store}>
       <View>
         <Text> ADVIRA </Text>
         <UserPage />
       </View>
     </Provider>
    )
  }
}

export default App; 
