
import { get, post, patch } from './httpClient';

export async function getUserLogin({ email, password }) {
    console.log('email', email);
    console.log('password', password);
    
    // return await get(`/users?email=${email}&password=${password}`);
}
// export async function regIsUser(payload) {
//     return await post(`/users`, payload);
// }

// export async function addFriend(payload) {
//     console.log('payload', payload);
//     // return await patch(`/users`, payload);    
// }

