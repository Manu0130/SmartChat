import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function index() {

    const [getMobile, setMobile] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getName, setName] = useState("");


    const [loaded, error] = useFonts(
        {
            "Montserrat-Bold": require('../assets/fonts/Montserrat-Bold.ttf'),
            "Montserrat-Light": require('../assets/fonts/Montserrat-Light.ttf'),
            "Montserrat-Regular": require('../assets/fonts/Montserrat-Regular.ttf'),
        }
    );

    useEffect(
        () => {

            async function checkUserInAsyncStorage() {
                try {
                    let userJson = await AsyncStorage.getItem("user");
                    if (userJson != null) {
                        router.replace("/home");
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            checkUserInAsyncStorage();
        },[]
    );

    useEffect(
        () => {

            if (loaded || error) {
                SplashScreen.hideAsync();
            }
        }, [loaded, error]
    );

    if (!loaded && !error) {

        return null;
    }

    const logoPath = require("../assets/favicon.png");

    return (

        <LinearGradient colors={['#CAF4FF', '#A0DEFF', '#5AB2FF']} style={stylesheet.view1}>


            <ScrollView >

                <View style={stylesheet.view2}>

                    <Image source={logoPath} style={stylesheet.image1} contentFit={"contain"} />

                    <Text style={stylesheet.text1}>Sign In</Text>

                    <Text style={stylesheet.text2}>Hello! Welcome to Smart Chat. Let's start the Conversation </Text>

                    <View style={stylesheet.avatar1} >
                        <Text style={stylesheet.text6}>{getName}</Text>
                    </View>

                    <Text style={stylesheet.text3}>Mobile</Text>
                    <TextInput style={stylesheet.input1} inputMode={"tel"} maxLength={10} onChangeText={
                        (text) => {
                            setMobile(text);
                        }
                    } onEndEditing={
                        async () => {
                            if (getMobile.length == 10) {
                                Alert.alert(getMobile);

                                let response = await fetch("https://1ce8-112-134-149-139.ngrok-free.app/SmartChat/GetLetters?mobile=" + getMobile);

                                if (response.ok) {
                                    let json = await response.json();
                                    setName(json.letters);
                                }

                            }
                        }
                    }



                    />

                    <Text style={stylesheet.text3}>Password</Text>
                    <TextInput style={stylesheet.input1} secureTextEntry={true} inputMode={"text"} maxLength={20} onChangeText={
                        (text) => {
                            setPassword(text);
                        }
                    } />

                    <Pressable style={stylesheet.pressable1} onPress={
                        async () => {

                            let formData = new FormData();
                            formData.append("mobile", getMobile);
                            formData.append("password", getPassword);

                            let response = await fetch(
                                "https://1ce8-112-134-149-139.ngrok-free.app/SmartChat/ChatSignIn",

                                {
                                    method: "POST",
                                    body: JSON.stringify(
                                        {
                                            mobile: getMobile,
                                            password: getPassword,
                                        }
                                    ),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }
                            );

                            if (response.ok) {
                                let json = await response.json();
                                // Alert.alert("Response", json.message);

                                if (json.success) {
                                    //user sign in complete

                                    let user = json.user; //එන user ව අපිට ගන්න පුලුවන්.

                                    try {

                                        await AsyncStorage.setItem("user", JSON.stringify(user));
                                        router.replace("/home");

                                    } catch (e) {

                                        Alert.alert("Error", "Something went wrong");

                                    }

                                } else {
                                    //problem occured
                                    Alert.alert("Error", json.message);

                                }

                            }

                        }
                    }>
                        <FontAwesome6 name={"right-to-bracket"} color={"white"} size={18} />
                        <Text style={stylesheet.text4}>Sign In</Text>
                    </Pressable>

                    <Pressable style={stylesheet.pressable2} onPress={
                        () => {
                            router.replace("/signup");
                        }
                    }>
                        <Text style={stylesheet.text2}>New User? Go to Sign Up</Text>
                    </Pressable>

                </View>

            </ScrollView>

        </LinearGradient>

    );
}

const stylesheet = StyleSheet.create(
    {
        view1: {
            flex: 1,
            justifyContent: "center",
            paddingTop: 60

        },

        image1: {
            // alignSelf: "center",
            width: "100%",
            height: 100,
        },

        text1: {
            fontSize: 32,
            fontFamily: "Montserrat-Bold",
        },

        text2: {
            fontSize: 18,
            fontFamily: "Montserrat-Regular",
        },

        text3: {
            fontSize: 18,
            fontFamily: "Montserrat-Bold",
        },

        text4: {
            fontSize: 18,
            fontFamily: "Montserrat-Bold",
            color: "white"
        },

        input1: {
            width: "100%",
            height: 50,
            borderStyle: "solid",
            borderWidth: 2,
            borderRadius: 15,
            paddingStart: 10
        },

        pressable1: {
            height: 50,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            marginTop: 10,
            flexDirection: "row",
            columnGap: 10
        },

        pressable2: {
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 15,
            marginTop: 10,

        },

        avatar1: {
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        },

        view2: {
            flex: 1,
            paddingHorizontal: 15,
            paddingVertical: 50,

            rowGap: 10,

        },

        text6: {
            fontSize: 40,
            fontFamily: "Montserrat-Bold",
            color: "blue"
        },
    }
);