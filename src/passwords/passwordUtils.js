import * as systemm from './../state/slices/system/systemUtils';
import store from './../state/store';

export const stars = num => {
    let r = '';
    for(let n=1;n<=num;n++) {
        r += '*';
    }
    return r;
}

export const leadingStars = (str, num) => {
    return stars(num) + str.substring(str, num);
}

export const trailingStars = (str, num) => {
    return str.substring(0, str.length - num) + stars(num);
}

export const innerStars = (str, numExposed) => {
    // will expose numExposed characters at start and end of string
    return str.substring(0, numExposed) + stars(str.length-(numExposed * 2)) + str.substring(str.length - numExposed);
}

export const generateRandomPassword = passwordLength => {
    console.debug('utilities.generateRandomPassword fired');
    let results = '';
    const map = store.getState().dropFile.data.settings.passwordGenerator.characterMap;
    for(let n=0;n<passwordLength;n++) {
        results += map[systemm.getRandomNumber(map.length)].char.toString();
    }
    return results;
}

