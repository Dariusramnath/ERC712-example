const signEIP712Message = require('./src/eip712Signer');
const { TypedDataUtils } = require('eth-sig-util');
const sigUtil = require('eth-sig-util');

// Replace with your actual private key and contract address
const privateKey = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const verifyingContract = '0x1234567890123456789012345678901234567890';

// Define the EIP-712 domain and message
const domain = {
  name: 'Example Domain',
  version: '1.0',
  chainId: 1,  // Ethereum mainnet
  verifyingContract,
};

const message = {
  value: 49,
  message: 'Dutty flex',
};

// Define the EIP-712 message type
const types = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
  ExampleMessage: [
    { name: 'value', type: 'uint256' },
    { name: 'message', type: 'string' },
  ],
};

// Sign the EIP-712 message
const signature = signEIP712Message(privateKey, domain, message, types);

console.log('EIP-712 Message:', message);
console.log('Signature:', signature);

// Decode the signature
const recoveredAddress = sigUtil.recoverTypedSignature({
  data: {
    types: {
      EIP712Domain: types.EIP712Domain,
      ExampleMessage: types.ExampleMessage,
    },
    domain: domain,
    primaryType: 'ExampleMessage',
    message: message,
  },
  sig: signature,
});

// const recoveredAddress = TypedDataUtils.recoverTypedSignature({
//   data: types,
//   sig: signature,
// });

console.log('Recovered Address:', recoveredAddress);
