import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function chat() {

    //get parameter
    const item = useLocalSearchParams();
    console.log(item.other_user_id);


    //store chat array
    const [getChatArray, setChatArray] = useState([]);

    const [getChatText, setChatText] = useState([]);


    const [loaded, error] = useFonts(
        {
            "Montserrat-Bold": require('../assets/fonts/Montserrat-Bold.ttf'),
            "Montserrat-Light": require('../assets/fonts/Montserrat-Light.ttf'),
            "Montserrat-Regular": require('../assets/fonts/Montserrat-Regular.ttf'),
        }
    );

    useEffect(
        () => {
            if (loaded || error) {
                SplashScreen.hideAsync();
            }
        }, [loaded, error]
    );

    //fetch chat array from server
    useEffect(
        () => {
            async function fetchChatArray() {

                let userJson = await AsyncStorage.getItem("user");
                let user = JSON.parse(userJson); //json කරපු එක js object එකක් කරගන්නවා.
                console.log(user.id);

                let response = await fetch("https://65ce-112-134-149-139.ngrok-free.app/SmartChat/LoadChat?logged_user_id=" + user.id + "&other_user_id=" + item.other_user_id);
                if (response.ok) {
                    let chatArray = await response.json();
                    console.log(chatArray);
                    setChatArray(chatArray);
                }
            }
            fetchChatArray();
            
            setInterval(()=>{
                fetchChatArray();
            }, 5000);
        }, []
    )

    if (!loaded && !error) {
        return null;
    }

    return (

        <LinearGradient colors={['#CAF4FF', '#A0DEFF', '#5AB2FF']} style={stylesheet.view1}>
            <StatusBar hidden={true} />

            <View style={stylesheet.view2}>
                <View style={stylesheet.view3}>
                    {
                        item.avatar_image_found == "true"
                            ? <Image style={stylesheet.image1}
                                source={"https://65ce-112-134-149-139.ngrok-free.app/SmartChat/AvatarImages/" + item.other_user_mobile + ".png"}
                                contentFit={"contain"} />
                            : <Text style={stylesheet.text1}>{item.other_user_avatar_letters}</Text>
                    }


                </View>
                <View style={stylesheet.view4}>
                    <Text style={stylesheet.text2}>{item.other_user_name}</Text>
                    <Text style={stylesheet.text3}>{item.other_user_status == 1 ? "Online" : "Offline"}</Text>
                </View>
            </View>

            <View style={stylesheet.center_view}>

                <FlashList

                    data={getChatArray}
                    renderItem={
                        ({ item }) =>

                            <View style={item.side == "right" ? stylesheet.view5_1 : stylesheet.view5_2}>
                                <Text style={stylesheet.text3}>{item.message}</Text>
                                <View style={stylesheet.view6}>
                                    <Text style={stylesheet.text4}>{item.datetime}</Text>
                                    {
                                        item.side == "right" ?
                                            <FontAwesome6 name={"check"} color={item.status == 1 ? "green" : "gray"} size={18} />
                                            :
                                            null
                                    }
                                </View>
                            </View>

                    }
                    estimatedItemSize={200}

                />

            </View>

            <View style={stylesheet.view7}>
                <TextInput style={stylesheet.input1} value={getChatText} onChangeText={
                    (text) => {
                        setChatText(text);
                    }
                }
                />
                <Pressable style={stylesheet.pressable1} onPress={
                    async () => {
                        Alert.alert("hi");

                        if (getChatText.length == 0) {
                            Alert.alert("Error", "Please enter your message");
                        } else {
                            let userJson = await AsyncStorage.getItem("user");
                            let user = JSON.parse(userJson);

                            let response = await fetch("https://65ce-112-134-149-139.ngrok-free.app/SmartChat/SendChat?logged_user_id=" + user.id + "&other_user_id=" + item.other_user_id + "&message=" + getChatText);

                            if (response.ok) {
                                let json = await response.json();

                                if (json.success) {
                                    console.log("Message Sent");
                                    setChatText("");
                                }
                            }
                        }
                    }
                }>
                    <FontAwesome6 name={"paper-plane"} color={"white"} size={18} />

                </Pressable>
            </View>

        </LinearGradient>
    );
}

const stylesheet = StyleSheet.create(
    {
        view1: {
            flex: 1,
        },
        view2: {
            // backgroundColor: "yellow",
            marginTop: 20,
            paddingHorizontal: 20,
            flexDirection: "row",
            columnGap: 20,
            justifyContent: "center",
            alignItems: "center"
        },
        view3: {
            backgroundColor: "white",
            width: 80,
            height: 80,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid",
            borderColor: "red",
            borderWidth: 2
        },
        image1: {
            width: 70,
            height: 70,
            borderRadius: 40,
            // backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center"
        },
        text1: {
            fontSize: 38,
            fontFamily: "Montserrat-Bold",
            color: "red"
            // backgroundColor:"black"

        },
        view4: {
            rowGap: 4,
        },
        text2: {
            fontSize: 20,
            fontFamily: "Montserrat-Bold"
        },
        text3: {
            fontSize: 16,
            fontFamily: "Montserrat-Bold"
        },
        view5_1: {
            backgroundColor: "yellow",
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 5,
            padding: 10,
            justifyContent: "center",
            alignSelf: "flex-end",
            rowGap: 5,
            width: "auto",

        },
        view5_2: {
            backgroundColor: "yellow",
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 5,
            padding: 10,
            justifyContent: "center",
            alignSelf: "flex-start",
            rowGap: 5,
            width: "auto",

        },
        view6: {
            flexDirection: "row",
            columnGap: 10,
        },
        text4: {
            fontSize: 14,
            fontFamily: "Montserrat-Regular"
        },
        view7: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 10,
            paddingHorizontal: 20,
            margin: 10,
        },
        input1: {
            height: 30,
            borderRadius: 10,
            borderStyle: "solid",
            borderWidth: 2,
            fontFamily: "Montserrat-Regular",
            fontSize: 20,
            flex: 1,
            paddingStart: 10,
        },
        pressable1: {
            backgroundColor: "blue",
            borderRadius: 20,
            padding: 10,
            justifyContent: "center",
            alignItems: "center"
        },
        center_view: {
            flex: 1,
            marginVertical: 20
        }
    }
)