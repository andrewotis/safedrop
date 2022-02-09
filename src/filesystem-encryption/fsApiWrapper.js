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

export const writeFile = async(fileHandle, contents) => {
    if (fileHandle.createWriter) {
        console.log('got the permission');
        const writer = await fileHandle.createWriter();
        await writer.write(contents);
        await writer.close();
        return;
    }
    // For Chrome 83 and later.
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
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


