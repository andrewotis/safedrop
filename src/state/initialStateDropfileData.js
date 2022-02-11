import { passwordGeneratorCharacters } from '../passwords/passwordGeneratorCharacters';

//state.dropFile.data.settings

export const initialStateDropfileData = {
    passwords: [],
    notes: [],
    files: [],
    calendar: [],
    settings: {
        postLoginDestination: 'Home',
        maskUsername: true,
        unmaskUsernameOnHover: true,
        idleTimeout: 3,
        clipboardEraseTimer: 10,
        passwordGenerator: {
            preferredLength: 12,
            noRepeatingChars: false,
            characterMap: passwordGeneratorCharacters
        }
    }
};

