import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Landing from '../screen/LandingScreen';
import SelectOption from '../screen/SelectCustomer';
import CLogin from '../screen/CustomerLogin';
import CRegister from '../screen/CustomerRegister';
import SLogin from '../screen/SupplierLogin';
import SRegister from '../screen/SupplierRegister';
import SMAP from '../screen/SupplierMap';
import DAddress from '../screen/DeliverAddress';
import CMAP from '../screen/CustomerMap';
import FPASS from '../screen/ForgotPassword';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true');
                setIsFirstLaunch(true);
              } else {
                setIsFirstLaunch(false);
              }
        });
    },[]);

    if (isFirstLaunch === null) {
        return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
      } else if (isFirstLaunch == true) {
        routeName = 'Home';
      } else {
        routeName = 'SelectCustomer';
      }


    return(
        <Stack.Navigator initialRouteName={routeName} screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Landing}/>
          <Stack.Screen name="SelectCustomer" component={SelectOption} />
          <Stack.Screen name="CustomerLogin" component={CLogin} />
          <Stack.Screen name="CustomerRegister" component={CRegister} />
          <Stack.Screen name="SupplierLogin" component={SLogin} />
          <Stack.Screen name="SupplierRegister" component={SRegister} />
          <Stack.Screen name="SupplierMap" component={SMAP} />
          <Stack.Screen name="DeliverAddress" component={DAddress} />
          <Stack.Screen name="CustomerMap" component={CMAP} />
          <Stack.Screen name="ForgotPass" component={FPASS} />
        </Stack.Navigator>
    );
}

export default AuthStack;