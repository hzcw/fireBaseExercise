import React, {Component} from 'react'
import {View,Text,TextInput,Button,StyleSheet,ActivityIndicator} from 'react-native'
import {ThemeProvider} from 'react-native-elements'

import firebase from './Firebase'

import Myheader from './Myheader'

export default class Newdata extends Component{

    constructor(props){
        super(props)
        this.state=({
            name:"",
            email:'',
            address:"",
            showError:false,
            error:'',
            showMessage:false,
            message:'',
            showLoading:false
            
        })
            this.emailRef=React.createRef();
            this.addressRef=React.createRef();
    }
    saveData=()=>{
        if(this.state.name.length <=0){
            this.setState({showError:true,error:"The name field is required."
                      
            })
            this.clearError();
            return;
        }
        if(this.state.email.length <=0){
             this.setState({showError:true,error:"The email field is required."
             })
             this.clearError();
             return;
         }
         if(this.state.address.length <=0){
             this.setState({showError:true,error:"The address field is required."
             })
             this.clearError();
             return;
         }
         this.setState({showLoading:true})

             const stu={
             name:this.state.name,
             email:this.state.email,
             address:this.state.address
         }
         firebase.database().ref("students").push(stu)
         .then((res)=>{
             this.setState({showLoading:false})
             this.setState({
                 name:'',
                 email:'',
                 address:'',
                 showMessage:true,
                 message:"The user have been created."
             })
             this.clearError();
             //console.log(res)
         })
         .catch((err)=>{
             console.log(err)
         })
     }

     clearError=()=>{
         setTimeout(()=>{
             this.setState({error:"",showError:false,message:"",showMessage:false})
         },2000)
     }

     
     
    render(){

        return(
           <ThemeProvider>
              <Myheader center="Add New Data"></Myheader>

                {
                    this.state.showError && (
                        <View style={styles.errorBody}>
                            <Text style={styles.errorText}>{this.state.error}</Text>
                        </View>
                    )
                }
                 {
                    this.state.showMessage && (
                        <View style={styles.messageBody}>
                            <Text style={styles.messageText}>{this.state.message}</Text>
                        </View>
                    )
                }
                {
                    this.state.showLoading && (
                        <ActivityIndicator
                        color="royalblue"
                        size={50}
                        ></ActivityIndicator>
                    )
                }

              <View style={styles.formContainer}>
                <View style={styles.formGroup}>
                    <Text>Name</Text>
                    <TextInput
                    onSubmitEditing={()=>this.emailRef.current.focus()}
                    style={styles.formControl}
                    onChangeText={(t)=>this.setState({name:t})}
                    value={this.state.name}
                    returnKeyType="next"
                    ></TextInput>
                </View>
                <View style={styles.formGroup}>
                    <Text>Email</Text>
                    <TextInput
                    ref={this.emailRef}
                    onSubmitEditing={()=>this.addressRef.current.focus()}
                    style={styles.formControl}
                    onChangeText={(t)=>this.setState({email:t})}
                    value={this.state.email}
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    ></TextInput>
                </View>
                <View style={styles.formGroup}>
                    <Text>Address</Text>
                    <TextInput
                    ref={this.addressRef}
                    style={styles.formControl}
                    onChangeText={(t)=>this.setState({address:t})}
                    value={this.state.address}
                    returnKeyType="done"
                    multiline={true}
                    onSubmitEditing={()=>this.saveData()}
                    ></TextInput>
                </View>
                <View>
                    <Button title="Save" onPress={()=>this.saveData()}></Button>
                </View>
            </View>
           </ThemeProvider>
        )
    }
}

const styles=StyleSheet.create({
    formContainer:{
        padding:20
    },
    formGroup:{
        marginBottom:20
    },
    formControl:{
        borderBottomColor:"#000",
        borderBottomWidth:1
    },
    errorBody:{
        borderColor:"red",
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#fff",
        padding:10,
        margin:10
    },
    errorText:{
       
        color:"red"

    },
    messageBody:{
        borderColor:"green",
        borderWidth:1,
        borderRadius:10,
        backgroundColor:"#fff",
        padding:10,
        margin:10
    },
    messageText:{
       
        color:"green"

    }
})