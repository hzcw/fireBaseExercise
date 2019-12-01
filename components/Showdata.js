import React, {Component} from 'react'
import {View,Text, Button,FlatList,ActivityIndicator,TouchableOpacity,Alert} from 'react-native'
import {ThemeProvider,ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import Myheader from './Myheader'
import { TextInput } from 'react-native-gesture-handler'
import Firebase from './Firebase'


class Students extends Component{
    render(){
        return(
            <View>
                <ListItem
                title={this.props.name}
                subtitle={this.props.email}
                rightSubtitle={this.props.address}
                bottomDivider
                rightIcon={
                    <TouchableOpacity onPress={()=>{this.props.dData()}}>
                        <Text>
                            <Icon name="trash" size={15} color="red"></Icon>
                        </Text>
                    </TouchableOpacity>
                }
                ></ListItem>
            </View>
        )
    }
}

export default class Showdata extends Component{
    constructor(props){
        super(props)
        this.state=({
            students:[],
            showLoading:false
        })
    }

    componentDidMount=()=>{
        this.fetchStudents();
    }

    confirmDelete=(id)=>{
        Firebase.database().ref("students/"+id).remove()
        .then((res)=>{
            this.fetchStudents();
        })
        .catch((err)=>{

        })
    }

    deleteData=(id)=>{
        Alert.alert(
            "Confirm",
            "The seleted student will be deleted permanently.",
            [
                {text:"No",style:"cancel"},
                {text:"Yes",style:"destructive",onPress:()=>this.confirmDelete(id)}
            ]
            )
    }

    fetchStudents=()=>{
        this.setState({showLoading:true})
        Firebase.database().ref("students").once("value")
        .then((res)=>{
            this.setState({showLoading:false})
           // console.log(res.val())
           const d=res.val();
           const stus=[];

           for(s in d){
               //console.log(d[s].name)
               let stu={
                   id:s,
                   name:d[s].name,
                   email:d[s].email,
                   address:d[s].address
               }
               stus.unshift(stu)
           }
           this.setState({students:stus})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return(
            <ThemeProvider>
                <Myheader center="Show Data"></Myheader>
                {
                    this.state.showLoading && (
                        <ActivityIndicator
                        color="royalblue"
                        size={50}
                        ></ActivityIndicator>
                    )
                }
                <View>
                    <FlatList
                    refreshing={this.state.showLoading}
                    onRefresh={()=>this.fetchStudents()}
                    keyExtractor={(s)=>s.id.toString()}
                    data={this.state.students}
                    renderItem={(s)=>{
                       // console.log(s)
                       return(
                        <Students
                        id={s.item.id}
                        dData={()=>this.deleteData(s.item.id)}
                        
                        name={s.item.name}
                         email={s.item.email}
                         address={s.item.address}
                        >
                        </Students>
                       )
                           
                       
                    }
                    }
                    />
                </View>
            
            </ThemeProvider>
        )
    }
}