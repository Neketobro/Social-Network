import {
  Box,
  Button,
  Collapse,
  useMediaQuery,
  Popover,
  Typography,
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectNavPanel, setOpen } from '../../../store';
import { ThemeToggle } from './ThemeToggle';
import Logo from '../../../assets/Logo.png';
import { useState, useCallback } from 'react';

export function NavBarLeft() {
  const isOpen = useSelector(selectNavPanel);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverText, setPopoverText] = useState('');

  const isMobile = useMediaQuery('(max-width:600px)');
  const location = useLocation();

  const tabMapping = {
    '/': 0,
    '/createpost': 1,
    '/profile/myprofile': 2,
  };
  const currentTab = tabMapping[location.pathname] ?? false;

  const navLinks = [
    {
      icon: <HomeRoundedIcon sx={{ fontSize: '2rem' }} />,
      text: 'Home',
      url: '/',
    },
    {
      icon: <AddBoxRoundedIcon sx={{ fontSize: '2rem' }} />,
      text: 'Createpost',
      url: '/createpost',
    },
    {
      icon: <AccountBoxRoundedIcon sx={{ fontSize: '2rem' }} />,
      text: 'Profile',
      url: '/profile/myprofile',
    },
  ];

  const handlePopoverOpen = useCallback((event, text) => {
    setPopoverText(text);
    setAnchorEl(event.currentTarget);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
    setPopoverText('');
  }, []);

  const popoverOpen = Boolean(anchorEl) && Boolean(popoverText);

  return (
    <Box
      sx={{
        height: '100%',
        padding: '1vw',
        minWidth: isOpen ? '10vw' : '5vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid',
        borderColor: 'divider',
        transition: '.5s all',
        position: 'fixed',
      }}
    >
      <Collapse in={isOpen} collapsedSize={40} orientation="horizontal">
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: 10,
            flexDirection: 'column',
          }}
          component="nav"
        >
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={Logo} alt="Loop" width={150} />
          </Box>
          {!isMobile && (
            <Button
              variant="text"
              onClick={() => dispatch(setOpen())}
              sx={{
                textDecoration: 'none',
                fontSize: '1em',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontWeight: 'bold',
                width: '100%',
                justifyContent: 'flex-start',
                padding: 0,
                margin: 0,
                minHeight: '48px',
              }}
            >
              {isOpen ? (
                <MenuOpenRoundedIcon sx={{ fontSize: '2rem' }} />
              ) : (
                <MenuRoundedIcon sx={{ fontSize: '2rem' }} />
              )}
              <Collapse in={isOpen} orientation="horizontal">
                Toggle
              </Collapse>
            </Button>
          )}
          {navLinks.map(({ icon, text, url }, key) => (
            <NavLink to={url} key={key} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  fontSize: '1em',
                  color: currentTab === key ? 'text.primary' : 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: 'bold',
                }}
              >
                <Box
                  onMouseEnter={(e) => !isOpen && handlePopoverOpen(e, text)}
                  onMouseLeave={handlePopoverClose}
                >
                  {icon}
                </Box>
                <Collapse in={isOpen} orientation="horizontal">
                  {text}
                </Collapse>
              </Box>
            </NavLink>
          ))}
        </Box>
      </Collapse>
      <Popover
        sx={{ pointerEvents: 'none' }}
        open={popoverOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{popoverText}</Typography>
      </Popover>
      <ThemeToggle />
    </Box>
  );
}
