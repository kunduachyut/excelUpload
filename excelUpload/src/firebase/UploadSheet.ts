import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Config.ts";

const app = initializeApp(firebaseConfig);

const createSheetURL = (file: Blob | Uint8Array | ArrayBuffer) => {
    return new Promise(async (resolve, reject) => {
        try {
            const storage = getStorage(app);
            const fileRef = ref(storage, 'sheets');

            await uploadBytes(fileRef, file);       // uploading excel in firebase storage from the blob or file containing the img

            getDownloadURL(fileRef).then((url: any) => {        // getting that excel url, uploaded in cloud
                resolve(url)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export {createSheetURL}