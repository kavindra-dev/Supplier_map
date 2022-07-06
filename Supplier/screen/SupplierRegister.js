import React,{useState,useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CYCLINDER_LOGO from '../assest/gas_tank.png';
import Supplier_PIC from '../assest/supplier_option.png';
import auth from '@react-native-firebase/auth';
import firebaserel from '@react-native-firebase/database';
import { AuthContext } from '../navigation/AuthProvider';



const SupplierRegister = ({navigation }) => {

  const {register} = useContext(AuthContext);

const [fullName, setFullName] = useState('');
const [userName, setUserName] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [resetpass, setResetPass] = useState('');
const [userType, setUserType] = useState(2);
const [loading,setLoading] = useState(false);

if(loading){
  return <ActivityIndicator size="large" color="#0000FF"/>
} 

  const registerSupplier = async() =>{
    setLoading(true)
    if(!fullName || !userName || !phone || !email || !password || !resetpass)
    {
      alert("Please enter all the details.")
      return
    } else if(password !== resetpass){
      alert("Please enter same password.")
      return
    } else {
      register(fullName,userName,phone,email,password,userType)
      .then(navigation.navigate("SupplierLogin"))
    }
   
  }

  return (
    <ScrollView style={styles.splashFlexGrow}>
      <View style={styles.splashBlueImageContainer}>
        <Text style={styles.text1}>Gas App</Text>
        <Text style={styles.text2}>Supplier Registration</Text>
        <View style={styles.datainput}>
          <TextInput style={styles.input}
          placeholder="Full Name"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={fullName}
          onChangeText={(fullName) => setFullName(fullName)}/>

          <TextInput style={styles.input}
          placeholder="User Name"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={userName}
          onChangeText={(userName) => setUserName(userName)}/>

          <TextInput style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={phone}
          onChangeText={(phone) => setPhone(phone)}/>

          <TextInput style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={email}
          onChangeText={(email) => setEmail(email)}/>

          <TextInput style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={password}
          onChangeText={(password) => setPassword(password)}/>

          <TextInput style={styles.input}
          placeholder="Retype Password"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={resetpass}
          onChangeText={(resetpass) => setResetPass(resetpass)}/>

          <TouchableOpacity
          style={styles.button}
          onPress={() =>
            registerSupplier()
            // navigation.navigate('SelectCustomer')
          }>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>

          <Text style={styles.text3}
          onPress={() =>
            navigation.navigate('SupplierLogin')
          }>Already have an account?</Text>
        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  splashFlexGrow: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF", 
  },
  splashBlueImageContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10%",
  },
  text1: {
    fontSize: 45,
    textAlign: 'center',
    color: "#000000",
    fontWeight: 'bold',
    marginTop: 20,
  },
  text2: {
    fontSize: 13,
    textAlign: 'center',
    color: "#787878",
  },
  text3: {
    fontSize: 14,
    textAlign: 'center',
    color: "#167FFC",
    marginTop: 30,
    marginBottom: 10,
  },
  supplies: {
    width: "45%",
    height: 200,
    backgroundColor: "#FFF5F6",
    margin: 5,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  customer: {
    width: "45%",
    height: 200,
    backgroundColor: "#F3FBFF",
    margin: 5,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  datainput: {
    width:"100%",
    margin: 12,
    padding: 10,
    alignItems: 'center'
  },
  input: {
    width:"90%",
    height: 45,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: '#DCDCDC',
    borderRadius: 5,
    color: "#000000",
  },
  button: {
    backgroundColor: '#167FFC',
    borderRadius: 10,
    padding: 12,
    width: "70%",
    height: 50,
    marginTop: '10%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'AvenirNextLTPro-Bold',
  },

});

export default SupplierRegister;