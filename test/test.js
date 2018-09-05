var forge = require('node-forge');


var keypair = forge.rsa.generateKeyPair({bits: 1024});

keypair = {
    public: fix(forge.pki.publicKeyToRSAPublicKeyPem(keypair.publicKey, 72)),
    private: fix(forge.pki.privateKeyToPem(keypair.privateKey, 72))
  };

function fix (str) {
    var r = str.replace('-----BEGIN RSA PUBLIC KEY-----','');
    return r.replace('-----END RSA PUBLIC KEY-----','')
}

console.log(typeof(keypair.public));
