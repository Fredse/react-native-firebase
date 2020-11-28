import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView,TextInput, Button, ActivityIndicator, Alert, ImageBackground} from 'react-native';
import firebase from '../database/firebase'

const image = {uri: 'https://image.freepik.com/vector-gratis/gracias-medicos-enfermeras-todo-personal-medico-heroes-hospital-luchan-contra-propagacion-pandemia-coronavirus_261130-5.jpg'};

const appointmmentDetails= (props) => {

     const initialState = {
        id: '',
        name:"",
        lastname:"",
        document: "",
        birthday: "",
        city:"",
        neighborhood:"",
        phone:""
    }
    const [appointmment, setAppointmment] = useState(initialState)

    const [loading, setLoading] = useState(true)

    const getAppointmentById = async (id) => {
        const dbRef = firebase.db.collection('appointmments').doc(id)
        const doc = await dbRef.get();
        const appointment = doc.data();
        setAppointmment({
            ...appointment,
            id: doc.id
        });
        setLoading(false);
    };
    
    useEffect( () => {
        getAppointmentById(props.route.params.appointmmentId);
    }, []);

    const handleChangeText = (name, value) => {
        
        setAppointmment({...appointmment, [name]: value});
    };

    const deleteAppointmment = async () => {
        const dbRef = firebase.db.collection('appointmments').doc(props.route.params.appointmmentId);
        await dbRef.delete();
        props.navigation.navigate('appointmmenList');
    }

    const updateAppointment = async () => {
        const dbRef = firebase.db.collection('appointmments').doc(props.route.params.appointmmentId);
        await dbRef.set({
            name: appointmment.name,
            lastname: appointmment.lastname,
            document: appointmment.document,
            birthday: appointmment.birthday,
            city: appointmment.city,
            neighborhood: appointmment.neighborhood,
            phone: appointmment.phone
        })
        setAppointmment(initialState)
        props.navigation.navigate('appointmmenList')
    }

    const openConfirmationAlert = () => {
        Alert.alert('Removera la cita?', 'Esta Seguro?', [
            {text: 'No', onPress: () => console.log(false)},
            {text: 'Si', onPress: () => deleteAppointmment()}
        ])
    }


    if(loading){
        return(
            <View>
                <ActivityIndicator size="large" color="#9e9e9e"/>
            </View>
        )
    }

    return(
        <ImageBackground source={image} style={style.image}>
            
            <ScrollView style={style.container}>
            <View style={style.inputGroup}>
                    <TextInput placeholder="name" value={appointmment.name} onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={style.inputGroup}>
                    <TextInput placeholder="lastname" value={appointmment.lastname} onChangeText={(value) => handleChangeText('lastname', value)}/>
            </View>
            <View style={style.inputGroup}>
                    <TextInput placeholder="document"  value={appointmment.document} onChangeText={(value) => handleChangeText('document', value)}/>
            </View>
            <View style={style.inputGroup}>
                    <TextInput placeholder="birthday (DD-MM-YY)" value={appointmment.birthday} onChangeText={(value) => handleChangeText('birthday', value)}/>
            </View>
            <View style={style.inputGroup}>
                    <TextInput placeholder="city" value={appointmment.city} onChangeText={(value) => handleChangeText('city', value)}/>
            </View>
            <View style={style.inputGroup}>
                    <TextInput placeholder="neighborhood" value={appointmment.neighborhood} onChangeText={(value) => handleChangeText('neighborhood', value)}/>
            </View>
            <View style={style.inputGroup}>
                    <TextInput placeholder="phone" value={appointmment.phone} onChangeText={(value) => handleChangeText('phone', value)}/>
            </View>
            <View style={style.button}>
                <Button  color="green" title="Actualizar Cita" onPress={()=> updateAppointment()}/>
            </View>
            <View style={style.button}>
                <Button color="red" title="Eliminar cita" onPress={()=> openConfirmationAlert()}/>
            </View>
            </ScrollView>
        </ImageBackground>
    )
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
        borderBottomColor: 'black',
        marginTop: 15
    },
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }, 
    button:{
        marginTop: 10
    }
})


export default appointmmentDetails;