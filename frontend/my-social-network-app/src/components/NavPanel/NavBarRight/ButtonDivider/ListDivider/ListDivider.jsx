import { List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export function ListDivider() {
    const DrawerList = [
        { element: <HelpOutlineOutlinedIcon />, text: 'Help' },
        { element: <SettingsOutlinedIcon />, text: 'Setting' },
    ];

    function handleItemClick(text) {
        switch (text) {
            case 'Help':
                // Дія для "Help"
                console.log('Help clicked (Comming soon!)');
                break;
            case 'Setting':
                // Дія для "Setting"
                console.log('Setting clicked (Comming soon!)');
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
    )
}