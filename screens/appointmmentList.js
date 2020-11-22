import React,{useEffect, useState} from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements';

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
        <ScrollView>
            <Button title="Create Appointmment" onPress={() => props.navigation.navigate('createAppointmment')} />
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
                            <ListItem.Title>{appointmment.name}{appointmment.lastname}</ListItem.Title>
                            <ListItem.Subtitle>{appointmment.document}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    );
};

export default appointmmenList;