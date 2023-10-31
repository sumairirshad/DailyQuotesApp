import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase';
import { ActivityIndicator, HelperText, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

const LoginScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [hidePass, setHidePass] = useState(true);

    const handleLogin = () => {
        if (email, password) {
            setIsPressed(true);
            auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
                const user = userCredentials.user;
                setIsPressed(false);
                navigation.goBack();
            })
                .catch(e => { setIsPressed(false), alert(e.message) });
        }
        else {
            alert('All fields are required!');
        }
    }

    const hasErrors = () => {
        return (password.length > 1 && password.length < 8);
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logoText} >Daily Quotes</Text>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome Back</Text>
            </View>

            <View style={styles.inputContainer}>
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
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    label={"Password"}
                    mode='outlined'
                    cursorColor='#0d0d0d'
                    outlineColor='#0d0d0d'
                    autoCorrect={false}
                    activeOutlineColor='#0d0d0d'
                    autoCapitalize="none"
                    returnKeyType="done"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.textInput}
                    secureTextEntry={hidePass}
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
                <HelperText type='error' visible={hasErrors()}>Password must be of atleast 8 characters!</HelperText>
            </View>

            <TouchableOpacity style={styles.forget} onPress={() => { navigation.navigate('Forgot Password') }} >
                <Text style={styles.forgetText}>Forgot your password?</Text>
            </TouchableOpacity>


            <View style={styles.buttonContainer}>

                <TouchableOpacity style={styles.button} disabled={isPressed} onPress={() => handleLogin()}>
                    <Text style={[styles.buttonText,]}>LOGIN</Text>
                    {isPressed && (
                        <ActivityIndicator style={{ marginLeft: 10 }} color={'white'} />
                    )}
                </TouchableOpacity>

            </View>

            <View style={styles.loginContainer}>
                <Text style={styles.text}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
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
    inputContainer: {
        margin: 10,
        width: '100%',
    },
    textInput: {
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
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
    forget: {
        marginBottom: 20,
        alignItems: 'flex-end',
        marginLeft: 'auto',
    },
    forgetText: {
        color: '#999999',
        fontSize: 13,
    },
    loginText: {
        color: '#0d0d0d',
        fontSize: 13,
    },
})