import { CircularProgress, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { UsersProfile } from '../../layout'
import { selectUsers, selectUserLogin } from '../../store';

export function UsersProfilePage() {
    const users = useSelector(selectUsers);
    const isUser = useSelector(selectUserLogin);


    console.log('users -> ', users);
    console.log('isUser -> ', isUser);

    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() =>
                <>
                    {users && typeof users === 'object' ? (
                        <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <UsersProfile users={users} isUser={isUser} />
                        </Container>
                    ) : (
                        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Container>
                    )}
                </>
            }
        />
    )
}