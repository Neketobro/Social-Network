import React, { useMemo } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const UsersProfile = React.memo(({ users, isUser }) => {
  const followers = useMemo(() => {
    if (!isUser || !isUser.subscribers) return [];
    return users.filter((user) => isUser.subscribers.includes(user.id));
  }, [users, isUser]);

  const userCardStyles = {
    padding: '10px',
    minWidth: '5vw',
    width: '13vw',
    height: '8vh',
    color: 'text.primary',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: '10px',
  };

  const renderUserList = (userList) =>
    userList.map(({ id, profile_picture_letter, first_name, last_name }) => (
      <NavLink
        to={`/profile/${id}`}
        key={id}
        style={{ textDecoration: 'none' }}
      >
        <Box sx={userCardStyles}>
          <Avatar>{profile_picture_letter}</Avatar>
          <Typography
            fontSize="1.4rem"
            noWrap
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {`${first_name} ${last_name}`}
          </Typography>
        </Box>
      </NavLink>
    ));

  if (!users || users.length === 0) {
    return <Typography align="center">No users found.</Typography>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h5" align="center" sx={{ mb: 2 }}>
        All users:
      </Typography>
      <Box
        sx={{
          paddingBlock: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {renderUserList(users)}
      </Box>
      {isUser && (
        <>
          <Typography
            variant="h5"
            component="h5"
            align="center"
            sx={{ mt: 4, mb: 2 }}
          >
            Followers:
          </Typography>
          <Box
            sx={{
              paddingBlock: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            {followers.length > 0 ? (
              renderUserList(followers)
            ) : (
              <Typography align="center">No followers found.</Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
});
