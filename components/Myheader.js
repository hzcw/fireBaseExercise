import React, {Component} from 'react'
import {View,Text} from 'react-native'
import {Header} from 'react-native-elements'

export default class Myheader extends Component{
    render(){
        return(
            <Header
            centerComponent={{text:this.props.center, style:{color:"#fff", fontSize: 20}}}
            >

            </Header>
        )
    }
}