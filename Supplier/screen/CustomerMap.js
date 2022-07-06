import React,{useState,useRef, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CYCLINDER_LOGO from '../assest/gas_tank.png';
import Supplier_PIC from '../assest/supplier_option.png';
import GREEN_ICON from '../assest/location.png';
import { AuthContext } from '../navigation/AuthProvider';
import LOGOUT from '../assest/tab_icon_more.png';
import { firebase } from '@react-native-firebase/database';



const CustomerMap = ({navigation }) => {
  const [loading,setLoading] = useState(false);
  const {user, logout} = useContext(AuthContext);
  const [latit, setLatit] = useState(0)
  const [longit, setLongit] = useState(0)
  const [id, setId] = useState('');

  if(loading){
    return <ActivityIndicator size="large" color="#0000FF"/>
  } 

  const customerLogout = async() =>{
    setLoading(true)
    logout()
    .then(navigation.navigate('CustomerLogin'));
    setLoading(false);
  }

  const checkorderStatus = () =>{
    firebase.database().ref("orders").child(id)
    .on('value', snapshot =>{
      if (snapshot.exists()) {
        console.log(snapshot.val().addressLatit)
        console.log(snapshot.val().addressLongit)
        setLatit(Number(snapshot.val().addressLatit))
        setLongit(Number(snapshot.val().addressLongit))
      } else {
        navigation.navigate('DeliverAddress')
      }
    })
  }

  

  const [focusedLocation, setFocusedLocation] = useState({
    latitude: latit === 0?37.78825 :latit,
    longitude: longit === 0?-122.4324:longit,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const markers = [
    {
      title: "My Location",
      coordinates: {
        latitude: latit,
        longitude:longit,
      },
    },
  ];

  useEffect(() =>{
    setId(user.uid);
    checkorderStatus();
  },[]);

  return (
      <SafeAreaView style={styles.splashFlexGrow}>
        <View style={styles.splashBlueImageContainer}>
          <MapView
          //region={focusedLocation}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude:latit === 0?37.78825 :latit,
            longitude:longit === 0?-122.4324:longit,
            latitudeDelta: 0.092,
            longitudeDelta: 0.02,
          }}>
            {markers.map((marker,index) => (
              <MapView.Marker coordinate={marker.coordinates} title={marker.title} draggable>
                {index === 0 && <Image source={GREEN_ICON} />}
              </MapView.Marker>
            ))}
          </MapView>
          <View style={styles.topBar}>
            <View style={styles.left_align}
              onStartShouldSetResponder={() => customerLogout()}>
            <TouchableOpacity>
            <Image source={LOGOUT} size={28} />
            </TouchableOpacity> 
          </View>
          </View>
        </View>
        <View style={styles.splashBlueImageContainer2}>
          <View style={styles.splashBlueImageContainer3}>
            <Image source={Supplier_PIC} style={styles.bgPic}/>
          </View>
        </View>
        <Text style={styles.text1}>Waiting for Supplier to Accept your Order</Text>
      </SafeAreaView>
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
  },
  splashBlueImageContainer3: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF5F6",
    borderRadius: 100,
    marginTop: 10
  },
  splashBlueImageContainer2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    fontSize: 20,
    textAlign: 'left',
    color: "#000000",
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 10,
    
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
  bgPic: {
    width: 85,
    height: 85,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height:"100%"
  },
  topBar: {
    position: 'absolute',
    width: "100%",
    top: 20,
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  left_align: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 100,
  },

});

export default CustomerMap;