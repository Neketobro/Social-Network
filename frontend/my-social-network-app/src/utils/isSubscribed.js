export function isSubscribed(subscribers = [], userId) {
  return Array.isArray(subscribers) && subscribers.includes(userId);
}
