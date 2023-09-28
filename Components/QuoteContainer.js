import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import ViewShot from 'react-native-view-shot';
import { SaveToDevice } from './SaveToDevice';
import { shareAsync } from 'expo-sharing';

const QuoteContainer = ({ title, quote, style }) => {

    const [isLiked, setIsLiked] = useState(false);

    const captureRef = useRef();

    const handleDownload = async () => {
        const uri = await captureRef.current.capture();
        SaveToDevice(uri, "quote.png", "image/png");
    };

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(quote);
    };

    const handleShare = async () => {
        const uri = await captureRef.current.capture();
        shareAsync(uri)
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.boxContainer}>
                {title && <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>}
                <ViewShot style={styles.contentContainer} ref={captureRef} options={{ format: 'png', quality: 1 }} >
                    <Entypo style={{ textAlign: 'right', width: '100%', transform: [{ rotate: '180deg' }] }} name="quote" size={24} color="#fff" />
                    <Text style={styles.quote}>{quote}</Text>
                    <Entypo style={{ textAlign: 'right', width: '85%' }} name="quote" size={24} color="#fff" />
                </ViewShot>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => setIsLiked(!isLiked)} activeOpacity={0.6} style={styles.buttonContainer}>
                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "#FE4444" : "#333333"} />
                        <Text style={styles.buttonText}>Like{isLiked ? "d" : ""}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDownload()} activeOpacity={0.6} style={styles.buttonContainer}>
                        <MaterialIcons name="file-download" size={24} color="#333333" />
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={copyToClipboard} activeOpacity={0.6} style={styles.buttonContainer}>
                        <MaterialIcons name="content-copy" size={24} color="#333333" />
                        <Text style={styles.buttonText}>Copy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} activeOpacity={0.6} style={styles.buttonContainer}>
                        <Ionicons name="share-social" size={24} color="#333333" />
                        <Text style={styles.buttonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default QuoteContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
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