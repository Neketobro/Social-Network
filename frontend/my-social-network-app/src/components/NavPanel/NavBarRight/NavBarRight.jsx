import { useDispatch, useSelector } from "react-redux";
import { Box } from '@mui/material';
import { FETCH_USER_PROTECTED_DATA, FETCH_USERS, selectNavPanel, selectUsers, selectUserLogin } from '../../../store'
import { ButtonDivider } from './ButtonDivider';
import { useEffect } from "react";
import { UsersPanel } from "./UsersPanel";
import { Loader } from '../../../components';


export function NavBarRight() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectNavPanel);
    const users = useSelector(selectUsers);
    const isUser = useSelector(selectUserLogin);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(FETCH_USERS(controller.signal));
        dispatch(FETCH_USER_PROTECTED_DATA());

        return () => {
            controller.abort();
        };
    }, [dispatch]);

    return (
        <Box
            sx={{
                height: '100%',
                width: isOpen ? '150px' : '200px',
                border: '1px solid',
                borderColor: 'divider',
                transition: '.4s all',
                position: 'fixed',
            }}>
            <ButtonDivider />
            {users && typeof users === 'object' ? (
                <UsersPanel users={users} isUser={isUser} />
            ) : (
                <Loader />
            )}
        </Box>
    )
}