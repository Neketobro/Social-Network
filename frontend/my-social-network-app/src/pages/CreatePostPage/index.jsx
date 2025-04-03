import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Box, CircularProgress } from '@mui/material';
import { NavBarRight, NavBarLeft, PageLayout } from '../../components';
import { CreatePost } from '../../layout';
import { selectUserLogin } from '../../store';

export function CreatePostPage() {
    const navigate = useNavigate();
    const isUser = useSelector(selectUserLogin);
    const isLoading = isUser === undefined;
    
    useEffect(() => {
        if (!isUser || Object.keys(isUser).length === 0) {
            navigate("/login");
        }
    }, [isUser, navigate]);

    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() =>
                isLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : isUser && Object.keys(isUser).length > 0 ? (
                    <CreatePost isUser={isUser} />
                ) : (
                    <CircularProgress />
                )
            }
        />
    );
}