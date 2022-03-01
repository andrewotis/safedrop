import store from "./../../store.js ";

export const settingsHelper = {
    get: () => {
        console.log('utilities.settingsHelper.get fired');
        const settings = store.getState().dropFile.data.settings
        if(settings !== undefined) {
            console.log(JSON.parse(settings))
            return JSON.parse(settings);
        } else {
            loadSettings(store.getState().dropFile);
            return JSON.parse(sessionStorage.getItem('settings'));
        }
    },
    set: (settings) => {
        console.log('utilities.settingsHelper.set fired');
        sessionStorage.setItem('settings', JSON.stringify(settings))
    },
}

export const loadSettings = async (dropFile) => {
    /*console.debug('utilities.loadSettings fired');
    const decrypted = await decryptDropFileData(dropFile);
    console.debug(decrypted);
    settingsHelper.set(decrypted.settings);*/
}

export const triedToPaste = e => {
    e.preventDefault();
    alert('no pasting');
    return false;
}

export const getRandomNumber = max => {
    return Math.floor(Math.random() * max);
}

export const copyToClipBoard = str => {
    console.debug('utilities.copyToClipBoard fired');
    navigator.clipboard.writeText(str);
}

export const clickToCopy = async (str) => {
    console.debug('utilities.clickToCopy fired');
    const settings = settingsHelper.get();
    copyToClipBoard(str);

    setTimeout(() => {
    }, (settings.clipboardEraseTimer * 1000));
}