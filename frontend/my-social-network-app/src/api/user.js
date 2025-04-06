
import { post, patch } from './httpClient';

export async function getUserLogin({ userId }) {
    return await post('/users', JSON.stringify({ userId }));
}
export async function isUserLogin({ email, password }) {
    return await post('/login', JSON.stringify({ email, password }))
}
export async function regIsUser(payload) {    
    return await post(`/users/register`, payload);
}
export async function addSubscriber({ payload }) {
    const { userId, subscriber } = payload;
    return await patch(`/users/${userId}/subscribe`, JSON.stringify(subscriber));
}
export async function deleteSubscriber({ payload }) {
    const { userId, subscriber } = payload;
    return await patch(`/users/${userId}/unsubscribe`, JSON.stringify(subscriber));
}

