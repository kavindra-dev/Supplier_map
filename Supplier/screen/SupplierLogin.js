import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firebaserel from '@react-native-firebase/database';
import CYCLINDER_LOGIN from '../assest/iconsupplierlogin.png';
import { AuthContext } from '../navigation/AuthProvider';


const SupplierLogin = ({navigation }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading,setLoading] = useState(false);

const {login} = useContext(AuthContext)

if(loading){
  return <ActivityIndicator size="large" color="#0000FF"/>
} 

const supplierLogin = async() =>{
  setLoading(true)
  if(!email || !password )
  {
    alert("Please enter credential details.")
    return
  } else {
    login(email,password)
    .then(navigation.navigate('SupplierMap'))
  }
}

  return (
    <ScrollView style={styles.splashFlexGrow}>
      <View style={styles.splashBlueImageContainer}>
        <Text style={styles.text1}>Gas App</Text>
        <Text style={styles.text2}>Supplier Log In</Text>
        <Image source={CYCLINDER_LOGIN}/>

        <View style={styles.datainput}>
        <TextInput style={styles.input}
          placeholder="Email"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={email}
          onChangeText={(email) => setEmail(email)}/>

        <TextInput style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={password}
          onChangeText={(password) => setPassword(password)}>
            {/* <Image source={CYCLINDER_LOGIN} style={styles.imageset}/> */}
            </TextInput>
        </View>
      </View>
      <View style={styles.splashBlueImageContainer2}>
          <Text style={styles.text3}
          onPress={() =>
            navigation.navigate('ForgotPass')}>Forgot Password </Text>
        </View>

        <View style={styles.splashBlueImageContainer3}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            supplierLogin()
          }>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>

          <Text style={styles.text4}
          onPress={() =>
            navigation.navigate('SupplierRegister')
          }>Become A Supplier</Text>
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
    marginTop: "5%",
  },
  splashBlueImageContainer3: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10%",
  },
  splashBlueImageContainer2: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'flex-start',
    marginLeft: "10%",
  },
  text1: {
    fontSize: 50,
    textAlign: 'center',
    color: "#000000",
    fontWeight: 'bold',
    marginTop: 20,
  },
  text2: {
    fontSize: 15,
    textAlign: 'center',
    color: "#787878",
  },
  text3: {
    fontSize: 14,
    color: "#808080",
  },
  text4: {
    fontSize: 14,
    color: "#808080",
    marginTop:"10%",
    marginBottom: "15%"
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
    padding: 5,
    alignItems: 'center'
  },
  input: {
    width:"90%",
    height: 50,
    margin: 10,
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
    width: 280,
    height: 50,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'AvenirNextLTPro-Bold',
  },
  imageset: {
    alignItems: 'flex-end',
    width: 20,
    height: 20,
  },

});

export default SupplierLogin;