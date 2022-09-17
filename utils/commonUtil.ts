// import * as crypto from 'crypto-js';
var cryptoJs = require('crypto-js')

export class CryptoCommon {

    constructor() { }

    encrypt(reqObject: any) {
        var ciphertext = cryptoJs.AES.encrypt(JSON.stringify(reqObject), "adloggsangular&5&secret@mission");
        return ciphertext.toString()
    }

    decrypt(reqHash: any) {
        var bytes = cryptoJs.AES.decrypt(reqHash, "adloggsangular&5&secret@mission");
        return JSON.parse(bytes.toString(cryptoJs.enc.Utf8))
    }

}

export var cryptoCommon = new CryptoCommon();