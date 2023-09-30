import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { Avatar, TextInput } from 'react-native-paper';
import { auth } from '../Firebase';
import AppHeader from '../Components/AppHeader';
import { UserContext } from '../Contexts/UserContext';

const ProfileScreen = () => {

    const { user } = useContext(UserContext)

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.displayName);
    const [isPressed, setIsPressed] = useState(false);

    const onSubmit = async () => {
        if (name !== user.displayName) {
            setIsPressed(true);
            try {
                await auth.currentUser.updateProfile({ displayName: name });
                alert("Updated Successfully");
                setIsPressed(false);
            } catch (error) {
                console.error(error);
                setIsPressed(false);
            }
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <AppHeader />
            <View style={styles.container}>

                <View style={styles.middleContainer}>

                    <View style={styles.titleContainer}>
                        <Avatar.Icon style={{ backgroundColor: '#ccc', marginBottom: 10 }} size={100} icon={'account'} />
                        <Text style={styles.title} >{user.displayName ? user.displayName : 'Anonymous User'}</Text>
                    </View>

                    <TextInput
                        placeholder={"Display Name"}
                        value={name}
                        style={styles.textInput}
                        label={"Display Name"}
                        cursorColor='#0d0d0d'
                        underlineColor='transparent'
                        activeUnderlineColor='#0d0d0d'
                        onChangeText={e => setName(e)}
                    />
                    <TextInput
                        placeholder={"Email Address"}
                        value={email}
                        style={styles.textInput}
                        label={"Email Address"}
                        cursorColor='#0d0d0d'
                        underlineColor='transparent'
                        activeUnderlineColor='#0d0d0d'
                        editable={false}
                    />

                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.button} disabled={isPressed} onPress={() => onSubmit()}>
                        <Text style={[styles.buttonText,]}>SUBMIT</Text>
                        {isPressed && (
                            <ActivityIndicator style={{ marginLeft: 10 }} color={'white'} />
                        )}
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    Container: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: 'black',
    },
    input: {
        fontSize: 16,
        paddingVertical: 8,
    },

    container: {
        paddingHorizontal: 30,
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    titleContainer: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        // fontFamily: 'Colab-Medium',
        // fontWeight: '700',
        color: '#0d0d0d',
    },
    textInput: {
        borderBottomColor: 'transparent',
        height: 60,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 7,
        paddingHorizontal: 15,
        margin: 10,
        borderColor: '#0d0d0d',
        borderWidth: 1,
    },
    middleContainer: {
        height: "60%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
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
        // fontWeight: '700',
        color: 'white',
    },
})