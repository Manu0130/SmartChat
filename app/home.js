import { registerRootComponent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function home() {

    const [getChatArray, setChatArray] = useState([]);

    const [loaded, error] = useFonts(
        {
            "Montserrat-Bold": require('../assets/fonts/Montserrat-Bold.ttf'),
            "Montserrat-Light": require('../assets/fonts/Montserrat-Light.ttf'),
            "Montserrat-Regular": require('../assets/fonts/Montserrat-Regular.ttf'),
        }
    );

    useEffect(
        () => {
            async function fetchData() {

                let userJson = await AsyncStorage.getItem("user");
                let user = JSON.parse(userJson); //json කරපු එක js object එකක් කරගන්නවා.

                let response = await fetch("https://c187-112-134-149-139.ngrok-free.app/SmartChat/LoadHomeData?id=" + user.id);

                if (response.ok) {
                    let json = await response.json();
                    // console.log(json);

                    if (json.success) {
                        let chatArray = json.jsonChatArray;
                        console.log(chatArray);
                        setChatArray(chatArray);
                        //FlashList


                    }
                }

            }

            fetchData();
        }, []
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

    return (
        <LinearGradient colors={['#CAF4FF', '#A0DEFF', '#5AB2FF']} style={stylesheet.view1}>

            <StatusBar
                animated={true}
                translucent={true}
                backgroundColor="transparent"
            />

            <FlashList

                data={getChatArray}
                renderItem={
                    ({ item }) =>

                        <Pressable style={stylesheet.view5} onPress={
                            ()=>{
                                Alert.alert("View CHat","User:"+ item.other_user_id);
                                router.push("/chat");
                            }
                        }>

                            <View style={item.other_user_status == 1 ? stylesheet.view6_2 : stylesheet.view6_1}>
                                {
                                    item.avatar_image_found ?
                                        <Image 
                                        style={stylesheet.image1} 
                                        contentFit="contain"
                                        source={"https://c187-112-134-149-139.ngrok-free.app/SmartChat/AvatarImages/" + item.other_user_mobile + ".png"} />
                                        :
                                        <Text style={stylesheet.text6}>{item.other_user_avatar_letters}</Text>
                                }
                            </View>

                            <View style={stylesheet.view4}>
                                <Text style={stylesheet.text1}>{item.other_user_name}</Text>
                                <Text style={stylesheet.text4} numberOfLines={1}>{item.message}</Text>

                                <View style={stylesheet.view7}>
                                    <Text style={stylesheet.text5}>{item.dateTime}</Text>
                                    <FontAwesome6 name={"check"} color={item.chat_status_id == 1 ? "green" : "gray"} size={20} />
                                </View>

                            </View>

                        </Pressable>

                }
                estimatedItemSize={200}
            />

        </LinearGradient>
    );
}

const stylesheet = StyleSheet.create(
    {
        view1: {
            flex: 1,
            paddingVertical: 60,
            paddingHorizontal: 20,

        },

        view2: {
            flexDirection: "row",
            columnGap: 20,
            padding: 10,
            backgroundColor: "#5dade2",
            borderBottomColor: "black",
            borderBottomWidth: 2,
            borderRadius: 10,
        },
        view3: {
            width: 80,
            height: 80,
            backgroundColor: "white",
            borderRadius: 40,
        },
        view4: {
            flex: 1,
            // backgroundColor:"yellow",
        },
        text1: {
            fontFamily: "Montserrat-Bold",
            fontSize: 22,
        },
        text2: {
            fontFamily: "Montserrat-Regular",
            fontSize: 16,
        },
        text3: {
            fontFamily: "Montserrat-Regular",
            fontSize: 14,
            alignSelf: "flex-end",
        },
        view5: {
            flexDirection: "row",
            marginVertical: 10,
            columnGap: 20,
        },
        view6_1: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            borderStyle: "dotted",
            borderWidth: 5,
            borderColor: "red",
            justifyContent: "center",
            alignItems: "center"
        },
        view6_2: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            borderStyle: "dotted",
            borderWidth: 5,
            borderColor: "green",
            justifyContent: "center",
            alignItems: "center"
        },
        text4: {
            fontFamily: "Montserrat-Regular",
            fontSize: 20,
            // overflow:"hidden",
            // height:24,
        },
        text5: {
            fontFamily: "Montserrat-Regular",
            fontSize: 14,
            alignSelf: "flex-end",
        },
        text6: {
            fontFamily: "Montserrat-Bold",
            fontSize: 24,
        },
        scrollview1: {
            marginTop: 20,

        },
        view7: {
            flexDirection: "row",
            columnGap: 20,
            alignSelf: "flex-end",
            alignItems: "center",
        },
        //35
        image1:{
            width: 70,
            height: 70,
            borderRadius: 40,
            // backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        }
    }
);