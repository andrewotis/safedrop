import * as wrapper from './openPgpWrapper';

export const generateSystemKeypair = async() => {
    const responseObj = await wrapper.generateKeypair(process.env.SD_HOUSE_KEY_PASSPHRASE, 'SafeDrop Admin: Fred Flintstone');
    return { publicKey: responseObj.publicKey, privateKey: responseObj.privateKey};
}