import { combineReducers } from 'redux';

import dropFileReducer from './slices/dropFile/dropFileReducer';
import decryptedReducer from './slices/decrypted/decryptedReducer';
import systemReducer from './slices/system/systemReducer';

const rootReducer = combineReducers({
    system: systemReducer,
    dropFile: dropFileReducer,
    decrypted: decryptedReducer
})

export default rootReducer;
