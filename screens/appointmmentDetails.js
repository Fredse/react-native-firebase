import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView,TextInput, Button, ActivityIndicator, Alert} from 'react-native';
import firebase from '../database/firebase'

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
        Alert.alert('remove the appointmment', 'are you sure?', [
            {text: 'Yes', onPress: () => deleteAppointmment()},
            {text: 'No', onPress: () => console.log(false)}
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
           <View>
                <Button color="#19AC52" title="Update Appointmment" onPress={()=> updateAppointment()}/>
           </View>
           <View>
                <Button color="#E37399" title="Delete Appointmment" onPress={()=> openConfirmationAlert()}/>
           </View>
       </ScrollView>
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
        borderBottomColor: '#cccccc'
    }
})


export default appointmmentDetails;