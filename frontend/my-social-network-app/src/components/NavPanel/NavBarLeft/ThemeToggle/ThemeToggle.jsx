import {
  ListItemIcon,
  ListItemButton,
  List,
  ListItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DARK_THEME, LIGHT_THEME } from '../../../../services';
import { selectTheme, setTheme } from '../../../../store';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

export function ThemeToggle() {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  function toggleThemeHandler() {
    const newTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    dispatch(setTheme(newTheme));
  }

  return (
    <List
      sx={{
        height: '60px',
        width: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ListItem disablePadding>
        <ListItemButton
          sx={{ borderRadius: '20px' }}
          onClick={toggleThemeHandler}
          aria-label="butoon to toggle theme"
        >
          {theme === DARK_THEME ? (
            <ListItemIcon sx={{ minWidth: '35px', textAlign: 'center' }}>
              <DarkModeOutlinedIcon color="text" />
            </ListItemIcon>
          ) : (
            <ListItemIcon sx={{ minWidth: '35px', textAlign: 'center' }}>
              <LightModeOutlinedIcon color="text" />
            </ListItemIcon>
          )}
        </ListItemButton>
      </ListItem>
    </List>
  );
}
