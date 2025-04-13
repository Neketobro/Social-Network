import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

export const navLinks = [
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
