import { useDispatch, useSelector } from "react-redux";
import { Box } from '@mui/material';
import { FETCH_USER_PROTECTED_DATA, FETCH_USERS, selectNavPanel, selectUserLogin, selectUsers } from '../../../store'
import { ButtonDivider } from './ButtonDivider';
import { useEffect } from "react";

export function NavBarRight() {
    const dispatch = useDispatch();
    const isUser = useSelector(selectUserLogin);
    const users = useSelector(selectUsers);
    const isOpen = useSelector(selectNavPanel);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(FETCH_USERS(controller.signal));
        dispatch(FETCH_USER_PROTECTED_DATA());

        return () => {
            controller.abort();
        };
    }, [dispatch]);

    // console.log('isUser -> ', isUser);
    // console.log('users -> ', users);
    // console.log('users -> ', users);
    return (
        <Box sx={{
            height: '100%',
            width: isOpen ? '150px' : '200px',
            border: '1px solid',
            borderColor: 'divider',
            transition: '.4s all',
            position: 'fixed',
        }}>
            <ButtonDivider />
        </Box>
    )
}