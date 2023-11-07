import didJWT from 'did-jwt';

//load the configured privated by default
let private_key = process.env.DID_PRIVATE_KEY;
let ethereum_address = process.env.DID_ETHEREUM_ADDRESS;

// if initial - generate a new private key
if(private_key === "") {

}

let did_issuer = "did:ethr:" + ethereum_address;

const signer = didJWT.ES256KSigner(didJWT.hexToBytes(private_key));

let jwt = await didJWT.createJWT(
    { aud: did_issuer, iat: undefined, name: 'Axiom Test user' },
    { issuer: did_issuer, signer },
    { alg: 'ES256K' }
  )