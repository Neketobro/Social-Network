import { get, post, del } from './httpClient';

export async function getPosts(signal) {
    return await get('/posts', signal);
}
export async function addPost(payload) {
    return await post('/posts', payload);
}
export async function getPostUser({ userId }) {
    return await post(`/posts/${userId}`, JSON.stringify({ userId }));
}
export async function deletePost({ postId }) {
    return await del(`/posts/${postId}`);
}
