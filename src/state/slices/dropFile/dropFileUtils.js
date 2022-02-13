import { encryptString, getSystemPublicKey } from "../../../filesystem-encryption/openPgpUtils";
import { writeFile } from "./../../../filesystem-encryption/fsApiWrapper";
import store from "../../store";

export const saveDropfile = async(fh, source = null) => {
    const state = store.getState();

    if(state.dropFile.data.settings.autoSaveDropFile === true || source === 'action') {
        const dropfile = {
            data: await encryptString(JSON.stringify(state.dropFile.data), state.dropFile.keys.publicKeyArmored),
            keys: {
                privateKeyArmored: state.dropFile.keys.privateKeyArmored,
                publicKeyArmored: state.dropFile.keys.publicKeyArmored,
                revocationCertificate: state.dropFile.keys.revocationCertificate
            }
        }

        const encrypted = await encryptString(JSON.stringify(dropfile), getSystemPublicKey());
        await writeFile(fh, JSON.stringify({data: btoa(encrypted)}));
    }
}

export const getFormattedDate = _ => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (parseInt(now.getMonth())+1).toString()).substr(-2);
    const hour = now.getHours();
    const minutes = ("0" + (parseInt(now.getMinutes())+1).toString()).substr(-2);
    const seconds =  ("0" + (parseInt(now.getSeconds())+1).toString()).substr(-2);
    const dateStr = year + "-" + month + "-" + now.getDate() + " " + hour + ":" + minutes + ":" + seconds;
    return dateStr;
}