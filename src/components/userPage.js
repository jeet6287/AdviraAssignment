import React , {Component} from 'react';
import {connect} from 'react-redux';

import {fetchData} from '../actions';
import {View,Text} from 'react-native';

class UserPage extends Component {
    constructor(props){
      super(props);
      this.state = {
          loading:false,
          page:1,
      }
    }

    componentDidMount(){
       this.props.fetchData(3,this.state.page);
    }

     render(){
         return(
            <View>
              <Text> USER PAGE </Text>
            </View>
         );
     }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {"name":"jaimaa"}
}

export default connect(mapStateToProps,{fetchData})(UserPage);