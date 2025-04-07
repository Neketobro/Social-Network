import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export function ListDivider() {
  const naviagte = useNavigate();

  const DrawerList = [
    { element: <AddCircleOutlineRoundedIcon />, text: 'Create Post' },
    { element: <PeopleAltRoundedIcon />, text: 'Profiles' },
    { element: <PersonRoundedIcon />, text: 'My Profile' },
  ];

  function handleItemClick(text) {
    switch (text) {
      case 'Create Post':
        naviagte('/createpost');
        break;
      case 'Profiles':
        naviagte('/profile');
        break;
      case 'My Profile':
        naviagte('/profile/myprofile');
        break;
      default:
        console.log('Unknown action');
    }
  }

  return (
    <List>
      <Divider />
      {DrawerList.map(({ element, text }, key) => (
        <ListItem key={key} disablePadding>
          <ListItemButton onClick={() => handleItemClick(text)}>
            <ListItemIcon>{element}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
    </List>
  );
}
