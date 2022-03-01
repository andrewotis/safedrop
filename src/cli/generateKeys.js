
import * as utils from './../passwords/passwordUtils.js';
const password = await utils.generateRandomPassword(16);
console.log(password);