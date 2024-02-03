// src/eip712Signer.js

const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');

function signEIP712Message(privateKey, domain, message, types) {
  const typedData = {
    types,
    domain,
    primaryType: 'ExampleMessage',
    message,
  };

  const messageHash = sigUtil.TypedDataUtils.sign(typedData, false);
  const signature = ethUtil.ecsign(Buffer.from(messageHash, 'hex'), Buffer.from(privateKey, 'hex'));
  const signedMessage = ethUtil.toRpcSig(signature.v, signature.r, signature.s);

  return signedMessage;
}

module.exports = signEIP712Message;
