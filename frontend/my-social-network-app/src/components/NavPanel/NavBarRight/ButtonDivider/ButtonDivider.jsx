import { Box, Button, Drawer } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin } from '../../../../store'
import { MyAccount } from './MyAccount/MyAccount';


export function ButtonDivider() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const isUser = useSelector(selectUserLogin);

    console.log('isUser ->', isUser);
    

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    return (
        <>
            <Button onClick={toggleDrawer(true)} variant='outlined' sx={{ width: '100%', color: 'text.primary', border: 'none', borderBottom: '1px solid', borderColor: 'divider', borderRadius: '0' }}>
                {!isUser ? 'Login' : (Object.keys(isUser).length > 0) ? 'user' : 'login2'}
            </Button>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                >
                    <MyAccount />
                    {/* <DividerList /> */}
                    <Box sx={{ marginTop: 'auto', paddingBottom: '16px' }}>
                        {/* <ButtonLogOut /> */}
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}