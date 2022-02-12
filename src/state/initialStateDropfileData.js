import { passwordGeneratorCharacters } from '../passwords/passwordGeneratorCharacters';

//state.dropFile.data.settings

export const initialStateDropfileData = {
    passwords: [],
    notes: [],
    files: [],
    calendar: [],
    settings: {
        pin: 0,
        postLoginDestination: 'Home',
        autoSaveDropFile: true,
        maskUsername: true,
        unmaskUsernameOnHover: true,
        idleTimeout: 3,
        clipboardEraseTimer: 10,
        passwordCategories: [],
        passwordGenerator: {
            preferredLength: 12,
            noRepeatingChars: false,
            characterMap: passwordGeneratorCharacters
        }
    },
    graveyard: [],
};

