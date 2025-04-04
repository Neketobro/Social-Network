import { Avatar, Box, Button, Drawer, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { selectUserLogin } from '../../../../store'
import { MyAccount } from './MyAccount';
import { ListDivider } from './ListDivider'
import { ButtonLogOut } from './ButtonLogOut'

export function ButtonDivider() {
    const [open, setOpen] = useState(false);
    const isUser = useSelector(selectUserLogin);

    const toggleDrawer = (newOpen) => () => setOpen(newOpen);

    return (
        <>
            <Button onClick={toggleDrawer(true)} variant='outlined' sx={{ width: '100%', height: '6vh', border: 'none', borderBottom: '1px solid', borderColor: 'divider', borderRadius: '0' }}>
                {!isUser ? 'LOGIN' : (Object.keys(isUser).length > 0) ? (
                    <>
                        <Avatar>
                            {isUser.profile_picture_letter}
                        </Avatar>
                        <Typography>
                            {`${isUser.first_name} ${isUser.last_name}`}
                        </Typography>
                    </>
                ) : 'LOGIN'}
            </Button>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                >
                    <MyAccount isUser={isUser} />
                    <ListDivider />
                    {isUser && Object.keys(isUser).length > 0
                        ? (
                            <Box sx={{ marginTop: 'auto', paddingBottom: '16px' }}>
                                <ButtonLogOut />
                            </Box>
                        )
                        : null
                    }
                </Box>
            </Drawer>
        </>
    )
}