
import { useDispatch, useSelector } from 'react-redux';
import { Loader, NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { Profile } from '../../layout';
import { useEffect } from 'react';
import { FETCH_POST, FETCH_USER, FETCH_USER_PROTECTED_DATA, selectPost, selectUser, selectUserLogin } from '../../store';
import { useParams } from 'react-router';

export function ProfilePage() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const user = useSelector(selectUser);
    const isUser = useSelector(selectUserLogin);
    const posts = useSelector(selectPost);
    
    useEffect(() => {
        dispatch(FETCH_USER_PROTECTED_DATA());
        dispatch(FETCH_USER({ userId: id }))
        dispatch(FETCH_POST({ userId: id }))
    }, [dispatch])

    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() => user ? (
                <Profile isUser={isUser} user={user} posts={posts} />
            ) : (
                <Loader />
            )}
        />
    )
}