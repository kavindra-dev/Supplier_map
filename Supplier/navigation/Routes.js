import React, {useContext, useState, useEffect} from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import AppStack from './AppStack.js';
import AuthStack from './AuthStack';

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
  
    const onAuthStateChanged = (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
    return (
      <NavigationContainer>
        {user?<AppStack/>:<AuthStack/>}
      </NavigationContainer>
    );
  };
  
  export default Routes;