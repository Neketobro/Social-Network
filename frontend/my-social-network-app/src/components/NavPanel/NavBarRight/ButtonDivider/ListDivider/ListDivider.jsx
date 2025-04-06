import { List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal } from "@mui/material"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { ModalHelp } from "./ModalWindow/ModalHelp";
import { ModalSetting } from "./ModalWindow/ModalSetting";
import { useState } from "react";


export function ListDivider() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const DrawerList = [
        { element: <HelpOutlineOutlinedIcon />, text: 'Help' },
        { element: <SettingsOutlinedIcon />, text: 'Setting' },
    ];

    function handleItemClick(text) {
        switch (text) {
            case 'Help':
                setOpen(true)
                console.log('Help clicked (Comming soon!)');
                break;
            case 'Setting':
                setOpen(true)
                console.log('Setting clicked (Comming soon!)');
                break;
            default:
                console.log('Unknown action');
        }
    }

    return (
        <>
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
            <ModalWindow />
        </>
    )
}