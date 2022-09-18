var cryptoJs = require('crypto-js')
const crypto = require("crypto");

export class CryptoCommon {

    constructor() { }

    encrypt(reqObject: any) {
        var ciphertext = cryptoJs.AES.encrypt(JSON.stringify(reqObject).replace(" ", ""), "adloggsangular&5&secret@mission");
        return encodeURIComponent(ciphertext.toString())
    }

    decrypt(reqHash: any) {
        var bytes = cryptoJs.AES.decrypt(decodeURIComponent(reqHash), "adloggsangular&5&secret@mission");
        return JSON.parse(bytes.toString(cryptoJs.enc.Utf8))
    }

    encryptData(reqData: any) {
        var key = "253D3FB468A0E24677C28A624BE0F939";
        var iv = "00000000000000000000000000000000";
        const encrypter = crypto.createCipheriv("aes-256-cbc", key, iv);
        let encryptedMsg = encrypter.update(reqData, "utf-8", "hex");
        encryptedMsg += encrypter.final("hex");

        return encryptedMsg.toString();
    }

    decryptData(reqHash: any) {
        var key = "253D3FB468A0E24677C28A624BE0F939";
        var iv = "00000000000000000000000000000000";
        const decrypter = crypto.createDecipheriv("aes-256-cbc", key, iv);
        let decryptedMsg = decrypter.update(reqHash, "hex", "utf8");
        decryptedMsg += decrypter.final("utf8");

        return decryptedMsg;
    }

    encrypter(data) {
        var cipher = crypto.createCipher('aes-256-ecb', data);
        return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    }

    decrypter(data) {
        var cipher = crypto.createDecipher('aes-256-ecb', data);
        return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
    }

}

export var cryptoCommon = new CryptoCommon();