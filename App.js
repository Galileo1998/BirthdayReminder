import React, {useState, useEffect} from "react";
import {SafeAreaView, View, Text, StyleSheet, StatusBar, Button, YellowBox} from "react-native";
import {decode, encode} from "base-64";
import Auth from "./src/components/Auth";
import firebase from "./src/utils/firebase";
import ListBirthday from "./src/components/ListBirthday";
import "firebase/auth";

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

YellowBox.ignoreWarnings(['AsyncStorage has been extracted from',
                          'YellowBox has been replaced with LogBox']);

export default function App(){
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if(user === undefined) return null;
  else 

  
  return (
    <>
    <StatusBar barStyle="light-content"></StatusBar>
    <SafeAreaView style = {styles.background}>
      {user ? <ListBirthday user = {user}/> : <Auth />}
    </SafeAreaView>
    </>
  );
}



const styles = StyleSheet.create({
  background: {
    backgroundColor: "#0A2B46",
    height: "100%",
  },
})