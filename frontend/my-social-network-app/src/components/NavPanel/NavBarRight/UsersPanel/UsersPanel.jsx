import React, { useMemo } from 'react';
import { Box, Avatar, Typography, Collapse } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectNavPanel } from '../../../../store';
import { useSelector } from 'react-redux';

export const UsersPanel = React.memo(({ users, isUser }) => {
  const isOpen = useSelector(selectNavPanel);
  const allUsers = useMemo(() => users, [users]);

  const followersList = useMemo(() => {
    return isUser && isUser.subscribers
      ? users.filter((user) => isUser.subscribers.includes(user.id))
      : [];
  }, [users, isUser]);

  return (
    <Box
      sx={{
        marginBlock: 10,
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <NavLink to="/profile" style={{ textDecoration: 'none' }}>
          <Typography
            variant="p"
            component="p"
            align="center"
            sx={{
              borderBlock: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          >
            View all users
          </Typography>
        </NavLink>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {allUsers &&
            allUsers
              .slice(0, 3)
              .map(({ id, profile_picture_letter, first_name, last_name }) => (
                <NavLink
                  to={`/profile/${id}`}
                  key={id}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    sx={{
                      padding: '10px',
                      width: isOpen ? '150px' : '200px',
                      height: '60px',
                      color: 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isOpen ? 'center' : 'space-between',
                      gap: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      transition: '.4s all',
                    }}
                  >
                    <Avatar>{profile_picture_letter}</Avatar>
                    <Collapse in={!isOpen} orientation="horizontal">
                      <Typography
                        fontSize="1rem"
                        noWrap
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {`${first_name} ${last_name}`}
                      </Typography>
                    </Collapse>
                  </Box>
                </NavLink>
              ))}
        </Box>
      </Box>
      {isUser && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <NavLink to="/profile" style={{ textDecoration: 'none' }}>
            <Typography
              variant="p"
              component="p"
              align="center"
              sx={{
                borderBlock: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
              }}
            >
              Followers:
            </Typography>
          </NavLink>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {followersList &&
              followersList
                .slice(0, 3)
                .map(
                  ({ id, profile_picture_letter, first_name, last_name }) => (
                    <NavLink
                      to={`/profile/${id}`}
                      key={id}
                      style={{ textDecoration: 'none' }}
                    >
                      <Box
                        sx={{
                          padding: '10px',
                          width: isOpen ? '150px' : '200px',
                          height: '60px',
                          color: 'text.primary',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: isOpen ? 'center' : 'space-between',
                          gap: 2,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          transition: '.4s all',
                        }}
                      >
                        <Avatar>{profile_picture_letter}</Avatar>
                        <Collapse in={!isOpen} orientation="horizontal">
                          <Typography
                            fontSize="1rem"
                            noWrap
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {`${first_name} ${last_name}`}
                          </Typography>
                        </Collapse>
                      </Box>
                    </NavLink>
                  )
                )}
          </Box>
        </Box>
      )}
    </Box>
  );
});
