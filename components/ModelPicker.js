import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';

const SWITCHES = ['Switch 1','Switch 2','Switch 3','Switch 4'];
const ACTIONS = ['ON','OFF'];

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

const ModelPicker = ({ changevidible, type, setData, setActionData}) => {

  const onPressItem = (item) => {
    if (type === 'switch') {
      setData(item);
    } else {
      setActionData(item);
    }
    changevidible(false);
  };

  const list = type === 'switch' ? SWITCHES : ACTIONS;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => changevidible(false)}
    >
      <View style={styles.modal}>
        {list.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onPressItem(item)}
          >
            <Text style={styles.text}>{item}</Text>
            <Avatar.Image
            source={require('../assets/power.png')}
            size={30}
            backgroundColor = 'white'
            />
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default ModelPicker;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
  },
  modal:{
    backgroundColor:'#fff',
    borderRadius:10,
    width:350,
    paddingVertical:10,
  },
  option:{
    flexDirection:'row',
    paddingVertical:10,
    justifyContent:'space-between',
    marginRight:ScreenWidth*0.05,
    alignItems:'center'
  },
  text:{
    fontSize:19,
    marginLeft:ScreenWidth*0.05,
    fontWeight:'bold'
  },
});
