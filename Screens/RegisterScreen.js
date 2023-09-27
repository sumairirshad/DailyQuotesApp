import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase';
import { TextInput } from 'react-native-paper';

const SignupScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);

    const handleSignup = () => {

        const isValidEmail = () =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

        const isValid = () => {
            if (confirmPass, email, password){
                if (!isValidEmail()) {
                    alert('Please enter a valid email address');
                    return false;
                }
                else if (password !== confirmPass){
                    alert('Password and Confirm Password does not match');
                    return false
                }
                return true;
            }
            else {
                alert("All fields are required!");
                return false;
            }
        }

        if (isValid()) {
            setIsPressed(true);
            auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
                const user = userCredentials.user;
                // const userData = {
                //     name: name,
                //     email: email,
                //     coinsRemaining: 20,
                //     phoneNumber: null,
                //     address: null,
                //     city: null,
                //     state: null,
                //     zipCode: null,
                //     country: null,
                // };
                // db.ref('Users/' + user.uid).set(userData);
                // user.updateProfile({
                //     displayName: name,
                // });
            })
                .catch(e => { setIsPressed(false), alert(e.message) });
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logoText} >Daily Quotes</Text>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Create an Account</Text>
            </View>


            <TextInput
                label={"Email Address"}
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
                mode='outlined'
                cursorColor='#0d0d0d'
                outlineColor='#0d0d0d'
                returnKeyType="next"
                activeOutlineColor='#0d0d0d'
            />
            <TextInput
                label={"Password"}
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.textInput}
                secureTextEntry={hidePass}
                mode='outlined'
                cursorColor='#0d0d0d'
                outlineColor='#0d0d0d'
                returnKeyType="next"
                activeOutlineColor='#0d0d0d'
                right={
                    <TextInput.Icon
                        icon={hidePass ? "eye" : "eye-off"}
                        onPress={() => {
                            setHidePass(!hidePass);
                            return false;
                        }}
                    />
                }
            />
            <TextInput
                label={"Confirm Password"}
                value={confirmPass}
                onChangeText={text => setConfirmPass(text)}
                style={styles.textInput}
                secureTextEntry={hidePassConfirm}
                mode='outlined'
                cursorColor='#0d0d0d'
                outlineColor='#0d0d0d'
                returnKeyType="done"
                activeOutlineColor='#0d0d0d'
                right={
                    <TextInput.Icon
                        icon={hidePassConfirm ? "eye" : "eye-off"}
                        onPress={() => {
                            setHidePassConfirm(!hidePassConfirm);
                            return false;
                        }}
                    />
                }
            />

            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} disabled={isPressed} onPress={() => handleSignup()}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                    {isPressed && (
                        <ActivityIndicator style={{ marginLeft: 10 }} color={'white'} />
                    )}
                </TouchableOpacity>

            </View>

            <View style={styles.loginContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignupScreen

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
        width: '80%',
        margin: 10,
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
        paddingHorizontal: 14,
        flexDirection: 'row',
        height: 60,
        paddingVertical: 16,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        // fontFamily: 'Colab-Regular',
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
    loginContainer: {
        marginTop: 20,
        flexDirection: 'row',
    },
    text: {
        color: '#999999',
        fontSize: 13,
        marginRight: 10,
    },
    loginText: {
        color: '#0d0d0d',
        fontSize: 13,
    },
})