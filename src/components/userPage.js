import React , {Component} from 'react';
import {connect} from 'react-redux';

import {fetchData,resetData} from '../actions';
import {View,FlatList,Text,RefreshControl,ActivityIndicator} from 'react-native';
import MealDataList from './mealDataList';

class UserPage extends Component {
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
         return (<ActivityIndicator size="large" color="#0000ff" />);
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

    render(){
        console.log(this.props.loading);
         return(
            <View>
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

export default connect(mapStateToProps,{fetchData,resetData})(UserPage);



// import React from 'react';
// import { StyleSheet, ActivityIndicator, View,RefreshControl } from 'react-native';
// import { Container, Content, Text, List } from 'native-base';
// import axios from 'axios';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     //initialize state values
//     this.state = {
//       pageNo: 1,
//       pageSize: 20,
//       showLoadingMore:false,
//       data: [],
//       loadMoreData: true,//to denote whether bottom of list is reached
//       shouldHit: true, //whether more data needs to be fetched
//       dataReceived: false, //whether initial data is fetched
//       refreshing:false
//     } 
//   }
//   componentWillMount = () => {
//     this.fetchData();
//   }

//   //function to fetch more data as per current page number
//   fetchData = () => {
//     if(this.state.pageNo!=1){
//       //when we try to fetch more data show loader at the bottom
//       this.setState({
//         showLoadingMore:true
//       })
//     }
//     var systemIPAddress='192.168.1.25'; // add your IP.
//     var url = 'http://'+systemIPAddress+':3000/fetch-paginated-data?pageNo='+this.state.pageNo+'&pageSize='+this.state.pageSize;
//     axios
//       .get(url)
//       .then(response => {
//         if (response.data.success) {
//           //add data to list and change the state to render new content
//           let receivedDataList = response.data.list;
//           let currentDataList = this.state.data;
//           //append to existing list
//           let newDataList = currentDataList.concat(receivedDataList);
//           //render new list
//           //once new list is set we are ready to load more data if bottom is reached
//           let loadMoreData =true;
//           if(this.state.refreshing){
//             this.setState({
//               pageNo:this.state.pageNo+1,
//               data:newDataList,
//               dataReceived:true,
//               loadMoreData: loadMoreData,
//               showLoadingMore:false,
//               refreshing:false
//             })
//           }else{
//             this.setState({
//               pageNo:this.state.pageNo+1,
//               data:newDataList,
//               dataReceived:true,
//               loadMoreData: loadMoreData,
//               showLoadingMore:false,
//             })
//           }
          
//         } else {
//           //no more data to be loaded
//           this.setState({
//             shouldHit:false,
//             showLoadingMore:false,
//             refreshing:false
//           })
//         }
//       })
//       .catch(error => {
//         console.log(error)
//       });
//   }

//   onRefreshHandler = () => {
//     //reset pageNo to 1
//     this.setState({refreshing: true,pageNo:1,data:[],dataReceived:false});
//     let reactNativeInstance = this;
//     //timeout to simulate loading
//     setTimeout(()=>{
//       reactNativeInstance.fetchData();
//     },100);
    
//   }

//   render() {
    
//     const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
//       const paddingToBottom = 40;
//       let result = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
//       //true if the end is reached other wise false
//       return result;
//     };

//     //initially display loader at the center
//     let listSection = 
//     <View style={ styles.container} >
//       <ActivityIndicator size="large" color="#0000ff" />
//     </View>

//     if (this.state.dataReceived) {
//       if (this.state.data.length > 0) {
//         listSection = this
//           .state
//           .data
//           .map((record) => {
//             return (
//               <View key={record.index} style={[styles.container,{ margin: 10, height:40, borderWidth:1, borderColor:'black'}]}>
//                 <Text>{record.index}. {record.data}</Text>
//               </View>
//             );
//           })
//       } else {
//         listSection = null;
//       }
//     }

//     if (this.state.refreshing) {
//       return (
//         <View style={styles.container}>
//           <Text>Refreshing Please Wait ...</Text>
//         </View>
//       )
//     } else if (this.state.dataReceived && this.state.data.length == 0) {
//       return (
//         <View style={styles.container}>
//           <Text>No records to display</Text>
//         </View>
//       )
//     } else {
//       return (
//         <Container style={{marginTop:40}}>
//           <Content 
//           refreshControl={
//             <RefreshControl
//             refreshing={this.state.refreshing}
//             onRefresh={this.onRefreshHandler}
//           />
//           }
//           onScroll={({ nativeEvent }) => {
//             if (isCloseToBottom(nativeEvent)) {
//               //prevent multiple hits for same page number
//               if(this.state.loadMoreData){
//                 //bottom reached start loading data
//                 this.setState({
//                   loadMoreData:false
//                 })
//                 this.fetchData();
//               }
              
//             }
//           }}>
//             <List>
//               {listSection}
//             </List>
//             {this.state.showLoadingMore ? <ActivityIndicator size="large" color="#0000ff" />: null}
            
//           </Content>

//         </Container>
//       )
//     }

//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });