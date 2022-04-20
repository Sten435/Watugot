var StellarBase = require('stellar-base');
/**
 * @param {'pi_adress'} wallet_id user wallet id (public id)
 */
function verify_walled_id(wallet_id){
    if (StellarBase.StrKey.isValidEd25519PublicKey(wallet_id)) {
        return true
    }
    return false
}

module.exports = verify_walled_id
