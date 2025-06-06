import { Avatar, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

export function MyAccount({ isUser }) {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      {isUser ? (
        <Box
          sx={{
            width: '100%',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Avatar>{isUser.profile_picture_letter}</Avatar>
          <Box sx={{ textAlign: 'end' }}>
            <Typography sx={{ color: 'text.primary', fontSize: '1rem' }}>
              {`${isUser.first_name} ${isUser.last_name}`}
            </Typography>
          </Box>
        </Box>
      ) : (
        <NavLink
          to="/login"
          style={{
            width: '100%',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Avatar />
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: 'text.primary', fontSize: '1.5rem' }}>
              Login
            </Typography>
          </Box>
          <Box>
            <LoginRoundedIcon sx={{ color: 'text.primary' }} />
          </Box>
        </NavLink>
      )}
    </Box>
  );
}
