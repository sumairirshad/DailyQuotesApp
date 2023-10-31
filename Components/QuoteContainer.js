import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import ViewShot from 'react-native-view-shot';
import { SaveToDevice } from './SaveToDevice';
import { shareAsync } from 'expo-sharing';
import { Portal, Snackbar } from 'react-native-paper';
import { UserContext } from '../Contexts/UserContext';
import { useContext } from 'react';
import { isQuoteLikedByTheUser, toggleLike } from '../Services/UserServices';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const QuoteContainer = ({ title, quote, style }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [visible, setVisible] = useState(false);

    const captureRef = useRef();

    const isRefreshing = useSelector((state) => state.isRefreshing.value);

    const { user } = useContext(UserContext);

    const navigation = useNavigation();

    const isLikedByTheUser = async () => {
        if (user) {
            const bool = await isQuoteLikedByTheUser(quote.quoteId);
            setIsLiked(bool);
        }
        else setIsLiked(false);
    }

    useEffect(() => {
        isLikedByTheUser();
    }, [isRefreshing])

    useEffect(() => {
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    }, [isCopied])

    const handleDownload = async () => {
        const uri = await captureRef.current.capture();
        SaveToDevice(uri, "quote.png", "image/png");
    };

    const copyToClipboard = async () => {
        setIsCopied(true);
        await Clipboard.setStringAsync(quote.quote);
    };

    const handleShare = async () => {
        const uri = await captureRef.current.capture();
        shareAsync(uri)
    }

    const onDismissSnackBar = () => setVisible(false);

    const handleLike = async () => {
        if (user) {
            const bool = await isQuoteLikedByTheUser(quote.quoteId);
            if (bool === isLiked) {
                await toggleLike(quote.quoteId);
                setIsLiked(!isLiked)
            }
            else setIsLiked(!isLiked);
        }
        else setVisible(true);
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.boxContainer}>
                {title && <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>}
                <ViewShot style={styles.contentContainer} ref={captureRef} options={{ format: 'png', quality: 1 }} >
                    <Entypo style={{ textAlign: 'right', width: '100%', transform: [{ rotate: '180deg' }] }} name="quote" size={24} color="#fff" />
                    <Text style={styles.quote}>{quote.quote}</Text>
                    <Entypo style={{ textAlign: 'right', width: '85%' }} name="quote" size={24} color="#fff" />
                </ViewShot>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => handleLike()} activeOpacity={0.6} style={styles.buttonContainer}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#FE4444" : "#333333"} />
                        <Text style={styles.buttonText}>Like{isLiked ? "d" : ""}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDownload()} activeOpacity={0.6} style={styles.buttonContainer}>
                        <MaterialIcons name="file-download" size={24} color="#333333" />
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.6} style={styles.buttonContainer}>
                        <MaterialIcons name="content-copy" size={24} color="#333333" />
                        <Text style={styles.buttonText}>{isCopied ? "Copied" : "Copy"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} activeOpacity={0.6} style={styles.buttonContainer}>
                        <Ionicons name="share-social" size={24} color="#333333" />
                        <Text style={styles.buttonText}>Share</Text>
                    </TouchableOpacity>
                    <Portal>
                        <Snackbar
                            visible={visible}
                            onDismiss={onDismissSnackBar}
                            action={{
                                label: 'Login',
                                textColor: 'white',
                                onPress: () => {
                                    navigation.navigate('Login');
                                },
                            }}>
                            Cannot like a quote without logging in
                        </Snackbar>
                    </Portal>
                </View>
            </View>
        </View>
    )
}

export default QuoteContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    boxContainer: {
        // borderWidth: 1,
        borderRadius: 10,
        // height: 400,
        overflow: 'hidden',
        elevation: 5,
    },
    titleContainer: {
        height: 50,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleText: {
        fontWeight: '700',
        fontSize: 14,
    },
    contentContainer: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingHorizontal: 20,
    },
    quote: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '800',
        textAlign: 'center',
    },
    actionsContainer: {
        height: 50,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        width: '25%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#333333',
        fontSize: 10,
    }
})