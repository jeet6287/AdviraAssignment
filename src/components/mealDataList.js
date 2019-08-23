import React, {Component} from 'react';
import {View , ImageBackground ,Text} from 'react-native';

class MealDataList extends Component {
    render(){
        console.log("MealDataList ",this.props);
        let {photo,comments,likes,placename,title} = this.props;
        let Image_Http_URL ={ uri: photo};
        return(
          <View style = {styles.containerStyle}>
            <ImageBackground 
              style = {styles.imageStyle}
              source = {Image_Http_URL}
            >
              <View style={styles.titleBoxStyle}>
                 <Text style = {{color:'#fff'}}>{title}</Text>
                 <Text style = {{color:'#fff'}}>{placename}</Text>
              </View>
            </ImageBackground>  
            <View style = {styles.commentBoxStyle}>
             <Text>{likes} Likes</Text>
             <Text>{comments} Comments</Text> 
            </View>
          </View>
        );
    }
}

const styles = {
    containerStyle:{
      margin:5,
    },  
    imageStyle:{
        height:300,
        resizeMode:'stretch',
        position:'relative',
    },
    titleBoxStyle:{
      position: 'absolute', 
      top: 250, 
      bottom: 0, 
      left:0,
      right:0,
      height:50,
      backgroundColor:'#000',
      opacity:0.7,
      flexDirection:'row',
      justifyContent: 'space-between', 
      alignItems:'center',
      padding:5,
    },
    commentBoxStyle:{
      padding:5,
      height:40,
      backgroundColor:"#f9f9f9",
      resizeMode:'stretch',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center',
      shadowColor:"#000",
      shadowOffset:{width:0,hiegt:2},
      shadowOpacity:0.2, 
      elevation:5,
      position:'relative'
    }
};

export default MealDataList;