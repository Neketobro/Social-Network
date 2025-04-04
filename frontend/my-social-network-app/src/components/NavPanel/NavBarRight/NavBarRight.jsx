import { useDispatch, useSelector } from "react-redux";
import { Box } from '@mui/material';
import { FETCH_USER_PROTECTED_DATA, FETCH_USERS, selectNavPanel } from '../../../store'
import { ButtonDivider } from './ButtonDivider';
import { useEffect } from "react";

export function NavBarRight() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectNavPanel);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(FETCH_USERS(controller.signal));
        dispatch(FETCH_USER_PROTECTED_DATA());

        return () => {
            controller.abort();
        };
    }, [dispatch]);    

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