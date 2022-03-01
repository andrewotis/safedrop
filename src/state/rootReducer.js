import { combineReducers } from 'redux';

import dropFileReducer from './slices/dropFile/dropFileReducer.js';
import decryptedReducer from './slices/decrypted/decryptedReducer.js';
import systemReducer from './slices/system/systemReducer.js';

const rootReducer = combineReducers({
    system: systemReducer,
    dropFile: dropFileReducer,
    decrypted: decryptedReducer
})

export default rootReducer;
