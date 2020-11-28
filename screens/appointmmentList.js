import React,{useEffect, useState} from 'react';
import {View, Text, ScrollView, Button, StyleSheet, ImageBackground} from 'react-native';
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements';

const image = {uri: 'https://png.pngtree.com/png-vector/20190307/ourlarge/pngtree-hospital-icon-design-template-vector-isolated-png-image_781871.jpg'};

const appointmmenList= (props) => {

    const [appointmments, setAppointmments] = useState([])

    useEffect(() =>{
        firebase.db.collection('appointmments').onSnapshot(querySnapshot => {

            const appointmments = [];

            querySnapshot.docs.forEach(doc =>{
                const {name, lastname, document,birthday,city,neighborhood ,phone} = doc.data()
                appointmments.push({
                    id: doc.id,
                    name, 
                    lastname,
                    document,
                    birthday,
                    city,
                    neighborhood,
                    phone
                })
            });
            setAppointmments(appointmments)
        });
    }, []);
    
    return(
        <ImageBackground source={image} style={styles.image}>

            <ScrollView>
            <Button color='blue' styles={styles.Button} title="Crear Nueva Cita" onPress={() => props.navigation.navigate('createAppointmment')} />
            {
                appointmments.map(appointmment =>{
                    return(
                        <ListItem key={appointmment.id} bottomDivider onPress={()=> 
                            props.navigation.navigate('appointmmentDetails', {
                                appointmmentId: appointmment.id
                            })
                        }>
                            <ListItem.Chevron/>
                            <Avatar source={{uri: 'https://sistemas.com/termino/wp-content/uploads/Usuario-Icono.jpg'}} rounded/>
                            <ListItem.Content>
                            <ListItem.Title>{appointmment.name} {appointmment.lastname}</ListItem.Title>
                            <ListItem.Subtitle>CC: {appointmment.document}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    Button: {
        flex: 1,
        padding: 100,
        borderBottomColor: '#cccccc'
    },
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
});

export default appointmmenList;