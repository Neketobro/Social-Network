
import { get, post, patch } from './httpClient';

export async function isUserLogin({email, password}) {
    return await post('/login', JSON.stringify({ email, password }))
}

//  Функція для логіна:
// const login = async (email, password) => {
//     const response = await fetch("http://localhost:3000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//         console.log('data', data);
        
//         // localStorage.setItem("token", data.token);
//         return data.user;
//     } else {
//         throw new Error(data.error);
//     }
// };

//  Використання токена для запиту до захищених даних:
// const fetchProtectedData = async () => {
//     const token = localStorage.getItem("token");

//     const response = await fetch("http://localhost:3000/protected", {
//         headers: { Authorization: `Bearer ${token}` },
//     });

//     return await response.json();
// };





// export async function regIsUser(payload) {
//     return await post(`/users`, payload);
// }

// export async function addFriend(payload) {
//     console.log('payload', payload);
//     // return await patch(`/users`, payload);
// }

