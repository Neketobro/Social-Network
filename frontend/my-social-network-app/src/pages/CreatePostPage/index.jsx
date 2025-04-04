import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavBarRight, NavBarLeft, PageLayout, Loader } from '../../components';
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
                    <Loader />
                ) : isUser && Object.keys(isUser).length > 0 ? (
                    <CreatePost isUser={isUser} />
                ) : (
                    <Loader />
                )
            }
        />
    );
}