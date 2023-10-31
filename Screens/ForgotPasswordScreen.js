import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase';
import { TextInput } from 'react-native-paper';

const ForgotPasswordScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');

    const handlePasswordReset = () => {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent successfully');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <View style={styles.container}>

            <Text style={styles.logoText} >Daily Quotes</Text>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Restore Password</Text>
            </View>


            <TextInput
                label={"Email Address"}
                value={email}
                mode='outlined'
                cursorColor='#0d0d0d'
                outlineColor='#0d0d0d'
                returnKeyType="next"
                activeOutlineColor='#0d0d0d'
                onChangeText={text => setEmail(text)}
                style={styles.textInput} />

            <View style={styles.textContainer}>
                <Text style={styles.text}>You will receive email with password reset link.</Text>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => handlePasswordReset()}>
                    <Text style={styles.buttonText}>SEND INSTRUCTIONS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonTrans} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonTransText}>BACK TO LOGIN</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 160,
        width: 160,
    },
    logoText: {
        color: '#0d0d0d',
        fontSize: 24,
        fontWeight: 'bold',
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        // fontFamily: 'Colab-Medium',
        color: '#0d0d0d',
    },

    textInput: {
        // height: 60,
        width: '80%',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#0d0d0d',
        width: '100%',
        padding: 15,
        height: 60,
        paddingVertical: 16,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        // fontFamily: "Colab-Regular",
        color: 'white',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 10,
        borderColor: 'grey',
        borderWidth: 1,
    },
    buttonOutlineText: {
        color: '#0d0d0d',
    },
    textContainer: {
        marginBottom: 20,
        marginTop: 5,
    },
    text: {
        color: '#999999',
        fontSize: 11,
    },
    buttonTrans: {
        marginVertical: 5,
        backgroundColor: '#fff',
        width: '100%',
        padding: 15,
        height: 60,
        borderWidth: 1,
        borderColor: '#0d0d0d',
        paddingVertical: 16,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTransText: {
        fontSize: 14,
        // fontFamily: "Colab-Medium",
        color: '#0d0d0d',
    },
})