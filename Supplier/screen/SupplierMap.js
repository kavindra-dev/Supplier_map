import Geolocation from '@react-native-community/geolocation';
import React,{useState,useRef, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CYCLINDER_LOGO from '../assest/customer_pic.png';
import Supplier_PIC from '../assest/on_way.png';
import LOGOUT from '../assest/tab_icon_more.png';
import CYCLINDER_VEHICAL from '../assest/supplier_option.png';
import LOC_SELECT from '../assest/locationselected.png';
import BELOW_LOC from '../assest/customer_avatar.png';
import BELL from '../assest/bellok.png';
import CLOSE from '../assest/close.png';
import LOC from '../assest/sent.png';
import { AuthContext } from '../navigation/AuthProvider';
import { PermissionsAndroid } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { firebase } from '@react-native-firebase/database';

const SupplierMap = ({navigation }) => {

  const {user, logout} = useContext(AuthContext);


  const [latit,setStaffLat] = useState(0);
  const [longit,setStaffLot] = useState(0);
  const [popup1,setPop1] = useState(false);
  const [popup2,setPop2] = useState(false);
  const [popup3,setPop3] = useState(false);
  const [viewBelow, setViewBelow] = useState(false);
  const [viewBelow1, setViewBelow1] = useState(false);
  const [viewBelow2, setViewBelow2] = useState(false);
  const [img,setImg] = useState(false);
  const [img1,setImg1] = useState(false);
  const [img2,setImg2] = useState(false);
  const [loading,setLoading] = useState(false);
  const [gpsEnabled, setGpsEnabled] = useState(false)
  const [locationStatus,setLocationStatus] = useState('');
  const [value, setValue] = useState([]);
  const [keyData, setKeyData] = useState([])
  var arr = []
  const mapRef = useRef();

  if(loading){
    return <ActivityIndicator size="large" color="#0000FF"/>
  } 

  
  
  const supplierLogout = async() =>{
    setLoading(true)
    logout()
    .then(navigation.navigate('SupplierLogin'));
    setLoading(false);
  }

  const getOneTimeLocation = () =>{
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here');
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setStaffLat(currentLatitude)
        setStaffLot(currentLongitude)
      }
    )
  } 

  const fetchMarkerData = () =>{
    let q = firebase.database().ref("orders");
    q.on('value', (snap)=>{
      var mData = []
      snap.forEach((data) =>{
        let result = data.val()
        result["dis"] = calculateDist(data.val().addressLatit, data.val().addressLongit) 
        mData.push(result)
      })
      arr=mData.sort(function(a, b) {
        return parseFloat(a.dis) - parseFloat(b.dis);
    });
    setKeyData(arr.slice(0,3))
      console.log(arr)
    })
  }

  //conversion to radian
  const toRadian = (n) => (n * Math.PI) / 180


  //Distance calculation
  const calculateDist = (latitude2, longitude2) =>{
    var lat2 = latitude2;
    var lon2 = longitude2;
    var lat1 = latit;
    var lon1 = longit; 
    var R = 6371; 
    var x1 = lat2 - lat1
    var dLat = toRadian(x1)
    var x2 = lon2 - lon1
    var dLon = toRadian(x2)

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    return d
  }

  useEffect(() => {
    fetchMarkerData()
    console.log("Key Val :", keyData)
      const requestLocationPermission = async() =>{
        if(Platform.OS === 'ios'){
          getOneTimeLocation();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              }
            );
            if(granted === PermissionsAndroid.RESULTS.GRANTED){
              getOneTimeLocation();
            } else {
              setLocationStatus('Permission Denied');
            }
          } catch (error) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
  },[]);

  const markers = [
    {
      title: "My Location",
      coordinates: {
        latitude: latit?latit:0,
        longitude: longit?longit:0,
      },
    },
    {
      title: "Location 1",
      id:1,
      coordinates: {
        latitude: latit?keyData[0].addressLatit:0,
        longitude: longit?keyData[0].addressLongit:0,
      },
    },
    {
      title: "Location 2",
      id:2,
      coordinates: {
        latitude: latit?keyData[1].addressLatit:0,
        longitude: longit?keyData[1].addressLongit:0,
      },
    },
  ];
  const onMarkerPress = (index) =>{
   if(index === 1){
     setPop1(true);
     setImg(true);
   } else if (index === 2){
     setPop2(true);
     setImg1(true);
   } else {
     setPop1(false);
     setPop2(false);
   }
  }

  const [focusedLocation, setFocusedLocation] = useState({
    latitude: latit === 0 ? 20.5937:latit,
    longitude: longit === 0 ? 78.9629:longit,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.00421,
  });


  

  return (
    <SafeAreaView style={styles.splashFlexGrow}>
      <View style={styles.splashBlueImageContainer}>
          <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: latit === 0 ?37.78825: latit,
            longitude: longit=== 0 ? -122.4324 : longit,
            latitudeDelta: 1.5,
            longitudeDelta: 1.5,
          }}>
            {markers.map((marker,index) => (
              <MapView.Marker coordinate={marker.coordinates} title={marker.title} draggable
              onPress={() => {onMarkerPress(index)}}>
                {index === 0 && <Image source={Supplier_PIC} />}
                {index === 1 && <Image source={img === false ? CYCLINDER_LOGO:LOC_SELECT} />}
                {index === 2 && <Image source={img1 === false ? CYCLINDER_LOGO:LOC_SELECT} />}
              </MapView.Marker>
            ))}
             
          </MapView>
          <View style={styles.topBar}>
            <View style={styles.left_align}
              onStartShouldSetResponder={() => supplierLogout()}>
            <TouchableOpacity>
            <Image source={LOGOUT} size={28} />
            </TouchableOpacity> 
          </View>
        </View>
        {popup1 === true && 
          <View style={styles.bottomBar}>
            <View style={styles.crossback} onStartShouldSetResponder={() => {
              setPop1(false);
              setImg(false);
            }}>
              <Text style={styles.cross}>x</Text>
            </View>
            <View style={styles.bottom_align}>
            <View style={styles.bgCircle}>
                <Image source={CYCLINDER_VEHICAL} style={{width: 60,height:50}}/>
              </View>
              <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() => {
                  setPop1(false);
                  setViewBelow(true);
                  setImg(true)
                  updateStat(keyData[0].uid)
                }}> Confirm Booking </Text>
              </TouchableOpacity>
            </View>
          </View>}
          {popup2 === true && 
          <View style={styles.bottomBar}>
            <View style={styles.crossback} onStartShouldSetResponder={() => {
              setPop2(false);
              setImg1(false);
            }}>
              <Text style={styles.cross}>x</Text>
            </View>
            <View style={styles.bottom_align}>
            <View style={styles.bgCircle}>
                <Image source={CYCLINDER_VEHICAL} style={{width: 60,height:50}}/>
              </View>
              <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonText}
                onPress={() => {
                  setPop2(false);
                  setViewBelow1(true);
                  setImg1(true)
                  //updateStat(keyData[1].uid)
                }}> Confirm Booking </Text>
              </TouchableOpacity>
            </View>
          </View>}
      </View>
      {(viewBelow === true || viewBelow1 === true) && 
      <View style={{backgroundColor:'#FFFFFF', justifyContent:'center'}}>
          <Text style={{color:'#000000', marginLeft: 15, marginTop:10, fontWeight:'bold', fontSize: 17}}> Select Customer </Text>
          </View>
          }
      {viewBelow === true &&
          <View style={{backgroundColor:'#FFFFFF', justifyContent:'center'}}>            
            <View style ={{backgroundColor:'#FFFFFF', justifyContent:'center', marginBottom:5}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Image source={BELOW_LOC} style={styles.bgPic}/>
                <View>
                <Text style={{color:'#000000', fontWeight:'bold', fontSize: 15, paddingTop:10}}>214 Lorem </Text>
                <Text style={{color:'#000000', fontSize: 10}}>Fleet Street </Text>
                <View style={{flexDirection:'row',marginTop:2}}>
                  <Image source={LOC} style={{width:10,height:10, resizeMode:'contain'}}/>
                  <Text style={{color:'#000000', fontSize: 10, marginLeft:5}}>500 Meters </Text>
                </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <View onStartShouldSetResponder={() => setViewBelow(false)}>
                  <Image source={BELL} style={[styles.bgPic, {marginLeft:40}]}/>
                </View>
                <View onStartShouldSetResponder={() => {
                  setViewBelow(false);
                  setImg(false);
                  }}>
                  <Image source={CLOSE} style={styles.bgPic}/>
                </View>
                
                </View>
                
              </View>
            </View>
          </View>
        }  

        {viewBelow1 === true &&
          <View style={{backgroundColor:'#FFFFFF', justifyContent:'center'}}>
            <View style ={{backgroundColor:'#FFFFFF', justifyContent:'center', marginBottom:5}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Image source={BELOW_LOC} style={styles.bgPic}/>
                <View>
                <Text style={{color:'#000000', fontWeight:'bold', fontSize: 15, paddingTop:10}}>214 Lorem </Text>
                <Text style={{color:'#000000', fontSize: 10}}>Fleet Street </Text>
                <View style={{flexDirection:'row',marginTop:2}}>
                  <Image source={LOC} style={{width:10,height:10, resizeMode:'contain'}}/>
                  <Text style={{color:'#000000', fontSize: 10, marginLeft:5}}>500 Meters </Text>
                </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <View onStartShouldSetResponder={() => setViewBelow(false)}>
                  <Image source={BELL} style={[styles.bgPic, {marginLeft:40}]}/>
                </View>
                <View onStartShouldSetResponder={() => {
                  setViewBelow1(false);
                  setImg1(false);
                  }}>
                  <Image source={CLOSE} style={styles.bgPic}/>
                </View>

                </View>
                
              </View>
            </View>
          </View>
        }  
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
    width: 190,
    height: 50,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'AvenirNextLTPro-Bold',
  },
  bgPic: {
    backgroundColor: "#F3FBFF",
    borderRadius: 100,
    padding: 10,
    margin: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  topBar: {
    position: 'absolute',
    width: "100%",
    top: 10,
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'flex-start'
  },
  bottomBar: {
    width: "90%",
    flexDirection: 'row-reverse',
    justifyContent:'space-between',
    top: "65%",
    bottom:10,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 20,
  },
  left_align: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 100,
  },
  bottom_align: {
    width: "90%",
    padding: 10,
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginTop:5
  },
  bgCircle: {
    backgroundColor:"#FFF5F6",
    borderRadius:100,
    width: 50,
    height: 50,
    alignItems:'center',
    margin:10,
  },
  cross: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FF0000',
  },
  crossback: {
    margin: 5,
    backgroundColor: '#FFF5F6',
    width: 28,
    height: 28,
    borderRadius: 100,
    alignItems: 'center',
    paddingBottom: 5,
  }

});

export default SupplierMap;