import { Box, Button, Drawer } from '@mui/material';
import { useState } from 'react';

export function ButtonDivider() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Button onClick={toggleDrawer(true)} variant='contained' sx={{ width: '100%', color: 'text.primary' }}>
                Login
            </Button>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                >
                    {/* <MyAccount />
                    <DividerList /> */}
                    <Box sx={{ marginTop: 'auto', paddingBottom: '16px' }}>
                        {/* <ButtonLogOut /> */}
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}