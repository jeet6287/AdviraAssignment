import React , {Component} from 'react';
import {connect} from 'react-redux';

import {fetchData} from '../actions';
import {View,FlatList,Text} from 'react-native';
import MealDataList from './mealDataList';

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

    renderFlatLitItems(){
    }

    render(){
         return(
            <View>
             <FlatList
                data={this.props.data}
                renderItem={({item}) => (
                    <MealDataList photo = {item.photo}/>
                )}
                keyExtractor={(item) => (item.id).toString() }
            />
            </View> 
         );
     }
}

const mapStateToProps = (state) => {
    console.log(state);
    var {data} = state.data;
    return {data};
}

export default connect(mapStateToProps,{fetchData})(UserPage);