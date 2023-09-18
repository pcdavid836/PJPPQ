import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { AuthContext } from '../../../context/AuthContext';

const ProfileScreen = () => {
  const {userInfo} = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
      />
      <View style={styles.body}>
      <Text style={styles.name}>{userInfo.Correo}</Text>
          <Text style={styles.info}>{userInfo.Rol}</Text>
          
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              defaultValue={userInfo.Nombres}
              onChangeText={setNombre}
              placeholder={'Nombre'}
              placeholderTextColor="#999"
            />
        <Text style={styles.label}>Apellido</Text>
            <TextInput
              style={styles.input}
              //value={'email'}
              //onChangeText={setEmail}
              defaultValue={userInfo.Primer_Apellido}
              placeholder="Apellido"
              placeholderTextColor="#999"
            />
          <Text style={styles.label}>Segundo Apellido</Text>
            <TextInput
              style={styles.input}
              //value={'email'}
              //onChangeText={setEmail}
              defaultValue={userInfo.Segundo_Apellido}
              placeholder="Segundo Apellido"
              placeholderTextColor="#999"
            />
            <Text style={styles.label}>Carnet de Identidad</Text>
            <TextInput
              style={styles.input}
              //value={'email'}
              //onChangeText={setEmail}
              placeholder="CI"
              defaultValue={userInfo.CI}
              placeholderTextColor="#999"
            />
            <Text style={styles.label}>Celular</Text>
            <TextInput
              style={styles.input}
              //value={'email'}
              defaultValue={userInfo.Celular}
              //onChangeText={setEmail}
              placeholder="Celular"
              placeholderTextColor="#999"
            />
            <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.button, styles.pass]}>
                <Text style={styles.buttonText}>Modificar Contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.save]}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            </View>
          {/*<TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 2</Text>
          </TouchableOpacity>*/} 
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
    Color: '#696969',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    alignSelf: 'center',
    paddingTop: 20,
  },
  info: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
    fontWeight:'bold',
  },
  label: {
    width: "100%",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
  inputContainer: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderRadius:6,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
    padding: 10,
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
    alignSelf: 'center',
  },
  btnContainer: {
    flex:2,
    flexDirection:'row',
    paddingTop: 15,
    justifyContent:'space-around'
  },
  button:{
    width: '48%',
    height:50,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
},
buttonText:{
    color:'#fff',
    fontWeight:'bold',
},
pass:{
    backgroundColor:'#eb8b00'
},
save:{
    backgroundColor:'#DB4437'
},
});
export default ProfileScreen;