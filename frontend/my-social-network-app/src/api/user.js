
import { get, post, patch } from './httpClient';

export async function isUserLogin({email, password}) {
    return await post('/login', JSON.stringify({ email, password }))
}


// export async function regIsUser(payload) {
//     return await post(`/users`, payload);
// }

// export async function addFriend(payload) {
//     console.log('payload', payload);
//     // return await patch(`/users`, payload);
// }

