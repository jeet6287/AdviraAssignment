import React from 'react';
import {View,Text,Image} from 'react-native';

const Header = (props) => {
 let {username,userimage} = props; 
 let userImage = { uri: userimage};
 return (
   <View style = {styles.viewStyle}>
     <Image 
       style = {styles.userImageStyle}
       source = {userImage}
     />
    <Text style = {styles.textStyle} >{username}</Text>
   </View>
 );
};

const styles = {
  viewStyle:{ 
    backgroundColor:"#f9f9f9", 
    flexDirection:'row',
    alignItems:'center', 
    paddingTop:10,
    height:60,
    shadowColor:"#000",
    shadowOffset:{width:0,hiegt:2},
    shadowOpacity:0.2, 
    elevation:2,
    position:'relative'
  },
  textStyle:{
    marginLeft:20,
    fontSize:20
  },
  userImageStyle:{
    marginLeft:10,
    width:40,
    height:40,
    borderRadius:20,
  }
}

export default Header;