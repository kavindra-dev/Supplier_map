import React, {useState,useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import CYCLINDER_LOGO from '../assest/order_now.png';
import { AuthContext } from '../navigation/AuthProvider';

const DeliverAddress = ({navigation }) => {

  const [address1,setAddress1] = useState('');
  const [address2,setAddress2] = useState('');
  const [type, setType] = useState('2');
  const [id, setId] = useState('');
  const [loading,setLoading] = useState(false);

  const {orderAddress} = useContext(AuthContext)
  const {user} = useContext(AuthContext);

  const submitAddress = async() =>{
    if(!address1 || !address2 )
    {
      alert("Please enter Address details.")
      return
    } else {
      setLoading(true)
      var address=address1+','+address2;
      geoCoder(address)
      // orderAddress(address1,address2, type, id)
      // .then(navigation.navigate('CustomerMap'));
      // setLoading(true)
    }
  }

  const geoCoder = (locate) =>{
    console.log(locate);
    Geocoder.init('AIzaSyDYfgXQDg5VA-XrQiAK8DgJ4a7m2Cfroeg', {language: 'en'})

    Geocoder.from(locate)
    .then(json =>{
      var location = json.results[0].geometry.location;
      var latitude=location['lat'];
      var longitude=location['lng'];
      orderAddress(locate, latitude, longitude, type, id)
      .then(navigation.navigate('CustomerMap'));
    })
  }

  useEffect(() =>{
    setId(user.uid);
  },[]);

  return (
    <ScrollView style={styles.splashFlexGrow}>
      <View style={styles.splashBlueImageContainer}>
        <Text style={styles.text1}>Delivery Address</Text>
      </View>

        <View style={styles.splashBlueImageContainer2}>
            <TextInput style={styles.input}
            placeholder="214 Lorem"
            placeholderTextColor={"#DCDCDC"}
            defaultValue={address1}
            onChangeText={(address1) => setAddress1(address1)}/>

            <TextInput style={styles.input}
            placeholder="Fleet Street"
            placeholderTextColor={"#DCDCDC"}
            defaultValue={address2}
            onChangeText={(address2) => setAddress2(address2)}/>
        
        <View style={styles.bgPic}
        onStartShouldSetResponder={() => submitAddress()}>
            <Image source={CYCLINDER_LOGO}/>
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
    splashBlueImageContainer2: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "10%",
    },
    splashBlueImageContainer3: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "20%",
      },
    text1: {
      fontSize: 30,
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
      padding: 10,
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
      backgroundColor: "#F6FAFF",
    },
    button: {
      backgroundColor: '#167FFC',
      borderRadius: 10,
      padding: 12,
      width: 280,
      height: 50,
      marginTop: 10,
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
    bgPic: {
        backgroundColor: "#F6FAFF",
        borderRadius: 30,
        padding: 20,
        marginTop: "20%",
    },
  
  });

export default DeliverAddress;