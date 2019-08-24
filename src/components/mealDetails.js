import React , {Component} from 'react';
import {connect} from 'react-redux';

import {fetchData,resetData} from '../actions';
import {View,FlatList,RefreshControl,ActivityIndicator} from 'react-native';
import MealDataList from './mealDataList';
import Header from './header';

class MealsData extends Component {
    constructor(props){
      super(props);
      this.state = {
          pageNumber:1,
          refreshing:false,
          Meals:[],
      }
    }

    UNSAFE_componentWillMount(){
        this._fetchData();
    }

    _fetchData(){
        if(this.state.refreshing){
            this.setState({
                refreshing:false,
            });
        }
        this.props.fetchData(this.state.pageNumber);
    }

    handleRefresh(){
        this.props.resetData();
        this.setState({pageNumber:1,refreshing:true},function(){this._fetchData()});
    }

    loadNextSetOfData = () => {
        console.log("loadNextSetOfData");
        this.setState({
            pageNumber: this.state.pageNumber + 1  
        }, () => {
          this._fetchData();
        });
      };

    renderDataAndLoader(){
      if(this.props.loading){
         return (<View style = {{justifyContent: 'center',alignItems: 'center'}}> 
                   <ActivityIndicator size="large" color="#000" /> 
                </View>
                )
      }else{
        return (  
            <FlatList
                data={this.props.data}
                renderItem={({item}) => (
                    <MealDataList 
                        photo = {item.photo} 
                        title = {item.title}
                        placename ={item.restaurant.place_name}
                        likes ={item.total_likes}
                        comments = {item.total_comments}

                    />
                )}
                keyExtractor={(item) => (item.id).toString() }
                refreshControl= {
                    <RefreshControl 
                      refreshing = {this.state.refreshing}
                      onRefresh = {this.handleRefresh.bind(this)} 
                    />
                }
                onEndReached={this.loadNextSetOfData}
                onEndThreshold={100} 
            />
          );
      }
    }

    renderNavigationBar(){
        if(this.props.data[0]){
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
