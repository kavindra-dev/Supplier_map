import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Alert
} from 'react-native';
import CYCLINDER_LOGO from '../assest/gas_tank.png';
import Supplier_PIC from '../assest/supplier_option.png';


const SelectCustomer = ({navigation}) => {

  return (
    <ScrollView style={styles.splashFlexGrow}>
      <View style={styles.splashBlueImageContainer}>
        <Text style={styles.text1}>Gas App</Text>
        <Text style={styles.text2}>Select from 2 options below</Text>
      </View>
      <View style={styles.splashBlueImageContainer}>
        <View style={styles.row}>
          <View style={styles.supplies}
          onStartShouldSetResponder={() => navigation.navigate('SupplierLogin')}>
            <Image source={Supplier_PIC}/>
            <Text style={styles.text3}>Supplier</Text>
          </View>
          <View style={styles.customer}
          onStartShouldSetResponder={() => navigation.navigate('CustomerLogin')}>
            <Image source={CYCLINDER_LOGO}/>
            <Text style={styles.text3}>Customer</Text>
          </View>
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
    marginTop: "20%",
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
    textAlign: 'center',
    color: "#808080",
    marginTop: 5,
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

});

export default SelectCustomer;