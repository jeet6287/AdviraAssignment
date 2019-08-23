import React , {Component} from 'react';
import {connect} from 'react-redux';

import {fetchData,resetData} from '../actions';
import {View,FlatList,Text,RefreshControl,ActivityIndicator} from 'react-native';
import MealDataList from './mealDataList';
import Header from './header';

class MealsData extends Component {
    constructor(props){
      super(props);
      this.state = {
          pageNumber:1,
          pageSize:20,
          refreshing:false,
      }
    }

    componentDidMount(){
        if(this.state.pageNumber != 1){

        }else{
            this._fetchData();
        }
    }

    _fetchData(){
        if(this.state.refreshing){
            this.setState({refreshing:false});
        }
        this.props.fetchData(3,this.state.pageNumber);
    }

    handleRefresh(){
        this.props.resetData();
        this.setState({pageNumber:1,refreshing:true},function(){this._fetchData()});
    }

    renderDataAndLoader(){
      if(this.props.loading){
         return (<View style = {{justifyContent: 'center',alignItems: 'center'}}> 
                   <ActivityIndicator size="large" color="#0000ff" /> 
                </View>
                )
      }else{
        return (  
            <FlatList
                data={this.props.data}
                renderItem={({item}) => (
                    <MealDataList photo = {item.photo}/>
                )}
                keyExtractor={(item) => (item.id).toString() }
                refreshControl= {
                    <RefreshControl 
                      refreshing = {this.state.refreshing}
                      onRefresh = {this.handleRefresh.bind(this)} 
                    />
                }
            />
          );
      }
    }

    renderNavigationBar(){
        if(this.props.data[0]){
            console.log(this.props.data[0]["user"]); 
            let {username,profile_pic_url} = this.props.data[0]["user"];
            return (
                <Header username = {username} userimage = {profile_pic_url}/> 
            );
        }
    }

    render(){
         return(
            <View>
               {this.renderNavigationBar()}
               {this.renderDataAndLoader()}
            </View> 
         );
     }
}

const mapStateToProps = (state) => {
    console.log(state);
    var {data,loading} = state.data;
    return {data,loading};
}

export default connect(mapStateToProps,{fetchData,resetData})(MealsData);
