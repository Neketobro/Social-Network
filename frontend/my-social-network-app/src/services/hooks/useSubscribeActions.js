import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectUserLoginStatus,
  USER_ADD_SUBSCRIBERS,
  USER_DELETE_SUBSCRIBERS,
} from '../../store';

export function useSubscribeActions(currentUser, targetUser) {
  const dispatch = useDispatch();
  const userLoginStatus = useSelector(selectUserLoginStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(userLoginStatus === 'loading');
  }, [userLoginStatus]);

  const add = () => {
    dispatch(USER_ADD_SUBSCRIBERS({
      userId: currentUser.id,
      subscriber: { subscriberId: targetUser.id }
    }));
  };

  const remove = () => {
    dispatch(USER_DELETE_SUBSCRIBERS({
      userId: currentUser.id,
      subscriber: { currentUserId: targetUser.id }
    }));
  };

  return { loading, add, remove };
}
