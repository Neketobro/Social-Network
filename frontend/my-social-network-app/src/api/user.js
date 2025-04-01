
import { get, post, patch } from './httpClient';

export async function isUserLogin({email, password}) {
    return await post('/login', JSON.stringify({ email, password }))
}

//  Використання токена для запиту до захищених даних:
export async function fetchProtectedData() {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:3000/protected", {
        headers: { Authorization: `Bearer ${token}` },
    });
    
    return await response.json();
}




// export async function regIsUser(payload) {
//     return await post(`/users`, payload);
// }

// export async function addFriend(payload) {
//     console.log('payload', payload);
//     // return await patch(`/users`, payload);
// }

