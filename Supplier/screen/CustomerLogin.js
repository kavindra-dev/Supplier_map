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
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CYCLINDER_LOGO from '../assest/gas_tank.png';
import Supplier_PIC from '../assest/supplier_option.png';
import auth from '@react-native-firebase/auth';
import firebaserel, { firebase } from '@react-native-firebase/database';
import { AuthContext } from '../navigation/AuthProvider';


const CustomerLogin = ({navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const {login, user} = useContext(AuthContext)
  const checkorderStatus = (id) =>{
    firebase.database().ref("orders").child(id)
    .on('value', snapshot =>{
      if (snapshot.exists()) {
        navigation.navigate('CustomerMap')
      } else {
        navigation.navigate('DeliverAddress')
      }
    })
  }

  const customerLogin = async() =>{
    setLoading(true)
    if(!email || !password )
    {
      alert("Please enter credential details.")
      return
    } else {
      login(email,password)
      .then(checkorderStatus(user.uid))
      //navigation.navigate('DeliverAddress')
    }
  }

  

  return (
    <ScrollView style={styles.splashFlexGrow}>
      <View style={styles.splashBlueImageContainer}>
        <Text style={styles.text1}>Log In</Text>
        <View style={styles.bgPic}>
          <Image source={CYCLINDER_LOGO}/>
        </View>
        

        <View style={styles.datainput}>
        <TextInput style={styles.input}
          placeholder="User Name"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={email}
          onChangeText={(email) => setEmail(email)}/>

        <TextInput style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#DCDCDC"}
          defaultValue={password}
          onChangeText={(password) => setPassword(password)}/>
        </View>
      </View>
      <View style={styles.splashBlueImageContainer2}>
          <Text style={styles.text3}
          onPress={() =>
            navigation.navigate('ForgotPass')}>Forgot Password </Text>
        </View>

        <View style={styles.splashBlueImageContainer3}>
        <TouchableOpacity
          style={styles.button}>
            <Text style={styles.buttonText}
            onPress={() =>  customerLogin()
            }> Log In </Text>
          </TouchableOpacity>

          <Text style={styles.text4}
          onPress={() =>
            navigation.navigate('CustomerRegister')
          }>Register as a Customer</Text>
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
    marginTop: "8%",
  },
  splashBlueImageContainer3: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "8%",
  },
  splashBlueImageContainer2: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: 'flex-start',
    marginLeft: "10%",
  },
  text1: {
    fontSize: 35,
    textAlign: 'center',
    color: "#000000",
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: "10%"
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
    padding: 8,
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
  bgPic: {
    backgroundColor: "#F3FBFF",
    borderRadius: 100,
    padding: 20,
    margin: 10,
  },

});

export default CustomerLogin;