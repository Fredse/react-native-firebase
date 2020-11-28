import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';//se instala el navigation native
import {createStackNavigator} from '@react-navigation/stack';//se instala el navigation stack

import appointmmentList  from './screens/appointmmentList';//se importa la vista lista
import appointmmentDetails from './screens/appointmmentDetails';// se importa la vista detalles
import createAppointmment from './screens/createAppointmment';//se importa la vista crear

const Stack = createStackNavigator()

function  Mystack(){//se crea por donde navegara la app
  return (
    <Stack.Navigator backgroundColor='blue'>
      <Stack.Screen name="appointmmenList" component={appointmmentList} options={{title: 'Agendamiento de Citas '}}/>
      <Stack.Screen name="createAppointmment" component={createAppointmment} options={{title: 'Ingresar Nueva Cita'}}/>
      <Stack.Screen name="appointmmentDetails" component={appointmmentDetails} options={{title: 'Detalles de la Cita'}}/>
    </Stack.Navigator>
  )
}

export default function App() {//se pone a funcionar las vistas navegables
  return (
    <NavigationContainer>
      <Mystack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});