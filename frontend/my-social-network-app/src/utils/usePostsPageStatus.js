import { useSelector } from 'react-redux';
import { selectPost, selectPostStatus, selectUsers, selectUsersStatus } from '../store';

export const usePostsPageStatus = () => {
  const users = useSelector(selectUsers);
  const posts = useSelector(selectPost);
  const usersStatus = useSelector(selectUsersStatus);
  const postsStatus = useSelector(selectPostStatus);

  const isLoading = usersStatus === 'loading' || postsStatus === 'loading';
  const isError = usersStatus === 'error' || postsStatus === 'error';
  const isEmpty =
    !Array.isArray(users) ||
    users.length === 0 ||
    !Array.isArray(posts) ||
    posts.length === 0;

  return { users, posts, isLoading, isError, isEmpty };
};
