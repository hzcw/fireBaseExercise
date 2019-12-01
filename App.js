import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Icons from 'react-native-vector-icons/FontAwesome5'

import Showdata from './components/Showdata'
import Newdata from './components/Newdata'

export default class App extends React.Component {
  render(){
    const myTab=createBottomTabNavigator({
      Newdata:{
        screen:Newdata,
        navigationOptions:{
          tabBarLabel:"Add Some Data",
          tabBarIcon:({tintColor})=><Icons size={14} color={tintColor} name="plus-circle"></Icons>
        }
      },
      Showdata:{
        screen:Showdata,
        navigationOptions:{
          tabBarLabel:"Available Data",
          tabBarIcon: ({tintColor})=><Icons name="tags" color={tintColor} size={14}></Icons>
        }
      }
    },{
      initialRouteName:"Showdata"
    })

    const AppContainer=createAppContainer(myTab)
    return(
      <AppContainer></AppContainer>
    )
  }
  
}
  
