import { Button } from '@mui/material';
import { useMemo } from 'react';
import { isSubscribed } from '../../../../utils';
import { useSubscribeActions } from '../../../../services/hooks/useSubscribeActions.js';

export function SubscribeButton({ isUser, user }) {
  const { loading, add, remove } = useSubscribeActions(isUser, user);

  const subscribed = useMemo(() => {
    return isSubscribed(isUser?.subscribers, user.id);
  }, [isUser?.subscribers, user.id]);

  if (isUser.id === user.id) return null;

  return subscribed ? (
    <Button
      variant="outlined"
      onClick={remove}
      disabled={loading}
      sx={{ marginBlock: 5 }}
    >
      Unsubscribe
    </Button>
  ) : (
    <Button
      variant="contained"
      onClick={add}
      disabled={loading}
      sx={{ marginBlock: 5 }}
    >
      Subscribe
    </Button>
  );
}
