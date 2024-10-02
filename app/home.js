import { registerRootComponent } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function home() {

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

            <View style={stylesheet.view2}>
                <View style={stylesheet.view3}></View>

                <View style={stylesheet.view4}>
                    <Text style={stylesheet.text1}>Sahan Perera</Text>
                    <Text style={stylesheet.text2}>0711111111</Text>
                    <Text style={stylesheet.text3}>Since, September 2024</Text>
                </View>

            </View>
            <ScrollView style={stylesheet.scrollview1}>

                <View style={stylesheet.view5}>
                    <View style={stylesheet.view6}></View>
                    <View style={stylesheet.view4}>
                        <Text style={stylesheet.text1}>Kavindu Sahan</Text>
                        <Text style={stylesheet.text4}>Hi! Sahan</Text>

                        <View style={stylesheet.view7}>
                            <Text style={stylesheet.text5}>Last Seen at 8.40 a.m.</Text>
                            <FontAwesome6 name={"check"} color={"gray"} size={20} />
                        </View>

                    </View>
                </View>

                <View style={stylesheet.view5}>
                    <View style={stylesheet.view6}></View>
                    <View style={stylesheet.view4}>
                        <Text style={stylesheet.text1}>Kavindu Sahan</Text>
                        <Text style={stylesheet.text4} numberOfLines={1}>Hi! Sahan. I need some help from you. Can you help me?</Text>

                        <View style={stylesheet.view7}>
                            <Text style={stylesheet.text5}>Last Seen at 8.40 a.m.</Text>
                            <FontAwesome6 name={"check"} color={"green"} size={20} />
                        </View>

                    </View>
                </View>

            </ScrollView>

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
        view6: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "white",
            borderStyle: "dotted",
            borderWidth: 5,
            borderColor: "red"
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
        scrollview1: {
            marginTop: 20,

        },
        view7: {
            flexDirection: "row",
            columnGap: 20,
            alignSelf: "flex-end",
            alignItems: "center",
        },
    }
);