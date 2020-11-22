import React, {useState} from 'react';
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import firebase from '../database/firebase'


const createAppointmment= (props) => {

     const [state, setState] = useState({
          name:"",
          lastname:"",
          document: "",
          birthday: "",
          city:"",
          neighborhood:"",
          phone:""  
     });

     const handleChangeText = (name, value) => {
          setState({...state, [name]: value});
     };

     const addNewAppointmment = async () => {
          if(state.name=== '' ||state.lastname=== ''||state.document=== ''||state.birthday=== ''||state.city=== ''||state.neighborhood=== ''||state.phone=== ''){
               alert('Error dates incompleted');
          }else{
               await firebase.db.collection('appointmments').add({
                    name: state.name,
                    lastname: state.lastname,
                    document: state.document,
                    birthday: state.birthday,
                    city: state.city,
                    neighborhood: state.neighborhood,
                    phone: state.phone
               })
               props.navigation.navigate('appointmmenList');
          }
     }

     return(
       <ScrollView style={style.container}>
           <View style={style.inputGroup}>
                <TextInput placeholder="name" onChangeText={(value) => handleChangeText('name', value)} />
           </View>
           <View style={style.inputGroup}>
                <TextInput placeholder="lastname" onChangeText={(value) => handleChangeText('lastname', value)}/>
           </View>
           <View style={style.inputGroup}>
                <TextInput placeholder="document" onChangeText={(value) => handleChangeText('document', value)}/>
           </View>
           <View style={style.inputGroup}>
                <TextInput placeholder="birthday (DD-MM-YY)" onChangeText={(value) => handleChangeText('birthday', value)}/>
           </View>
           <View style={style.inputGroup}>
                <TextInput placeholder="city" onChangeText={(value) => handleChangeText('city', value)}/>
           </View>
           <View style={style.inputGroup}>
                <TextInput placeholder="neighborhood" onChangeText={(value) => handleChangeText('neighborhood', value)}/>
           </View>
           <View style={style.inputGroup}>
                <TextInput placeholder="phone" onChangeText={(value) => handleChangeText('phone', value)}/>
           </View>
           <View>
                <Button title="Save appointmment" onPress={()=> addNewAppointmment()}/>
           </View>
       </ScrollView>
    );
};

const style =StyleSheet.create({
    container:{
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default createAppointmment;