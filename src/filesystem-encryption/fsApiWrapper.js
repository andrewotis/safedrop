export const createNewFileHandle = async() => {
    // create a new handle
    const fileHandle = await window.self.showSaveFilePicker({
        suggestedName: 'dropfile.json',
        types: [{
            description: 'SafeDrop JSON DropFile',
            accept: {
                'text/json': ['.json'],
            },
        }],
        startIn: 'documents'
    });
    return fileHandle;
}

export const openExistingFileHandle = async() => {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    return fileHandle;
}

export const readFile = async(fileHandle) => {
    const file = await fileHandle.getFile();
    const contents = await file.text();
    return {
        name: file.name,
        contents: contents
    };
}

export const writeFile = async (fileHandle, contents) => {
    const writable = await fileHandle.createWritable();
    await writable.write(contents);
    await writable.close();
}

export const verifyPermission = async (fileHandle, readWrite) => {
    const options = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }
    if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true;
    }
    if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
    }
    return false;
}

export const deleteFile = async (fileHandle) => {
    await fileHandle.remove();
}


