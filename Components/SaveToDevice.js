import { shareAsync } from 'expo-sharing'
import * as FileName from 'expo-file-system'

const SaveToDevice = async (uri, filename, type) => {
    if (Platform.OS === 'android') {
        const permissions = await FileName.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
            const base64 = await FileName.readAsStringAsync(uri, { encoding: FileName.EncodingType.Base64 });
            const newUri = await FileName.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, type);
            await FileName.writeAsStringAsync(newUri, base64, { encoding: FileName.EncodingType.Base64 });
        }
        else shareAsync(uri);
    }
    else shareAsync(uri);
}

export { SaveToDevice }