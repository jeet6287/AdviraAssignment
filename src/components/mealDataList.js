import React, {Component} from 'react';
import {View , Image } from 'react-native';

class MealDataList extends Component {
    render(){
        //console.log("MealDataList ",this.props);
        let Image_Http_URL ={ uri: this.props.photo};
        return(
          <View style = {styles.containerStyle}>
            <Image 
              style = {styles.imageStyle}
              source = {Image_Http_URL}
            />
            <View>

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
    }
};

export default MealDataList;