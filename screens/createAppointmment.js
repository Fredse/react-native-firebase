import React, {useState} from 'react';
import {View, Button, TextInput, ScrollView, StyleSheet, ImageBackground} from 'react-native';
import firebase from '../database/firebase'

const image = {uri: 'https://www.esan.edu.pe/conexion/bloggers/2017/10/11/1500x844_medicos.jpg'};


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
               alert('Error faltan datos por ingresar, llenelos e intente nuevamente');
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
     <ImageBackground source={image} style={style.image}>
       <ScrollView style={style.container}>
               <View style={style.inputGroup}>
                    <TextInput placeholder="Nombre" onChangeText={(value) => handleChangeText('name', value)} />
               </View>
               <View style={style.inputGroup}>
                    <TextInput placeholder="Apellido" onChangeText={(value) => handleChangeText('lastname', value)}/>
               </View>
               <View style={style.inputGroup}>
                    <TextInput placeholder="Numero Documento" maxLength={10} onChangeText={(value) => handleChangeText('document', value)}/>
               </View>
               <View style={style.inputGroup}>
                    <TextInput placeholder="Fecha de Nacimiento (DD-MM-YY)" onChangeText={(value) => handleChangeText('birthday', value)}/>
               </View>
               <View style={style.inputGroup}>
                    <TextInput placeholder="Ciudad" onChangeText={(value) => handleChangeText('city', value)}/>
               </View>
               <View style={style.inputGroup}>
                    <TextInput placeholder="Barrio" onChangeText={(value) => handleChangeText('neighborhood', value)}/>
               </View>
               <View style={style.inputGroup}>
                    <TextInput placeholder="Telefono" onChangeText={(value) => handleChangeText('phone', value)}/>
               </View>
               <View style={style.button}>
                    <Button color="blue" title="Guardar Cita" onPress={()=> addNewAppointmment()}/>
               </View>
       </ScrollView>
     </ImageBackground>
    );
};

const style =StyleSheet.create({
    container:{
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 3,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginTop: 15
    },
    button: {
         marginTop: 30
    },
    image:{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center"
    }
    
})

export default createAppointmment;