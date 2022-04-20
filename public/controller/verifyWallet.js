import { StrKey } from 'stellar-base';
/**
 * @param {'pi_adress'} wallet_id user wallet id (public id)
 */
function verify_walled_id(wallet_id){
    if (StrKey.isValidEd25519PublicKey(wallet_id)) {
        return true
    }
    return false
}

export default verify_walled_id
