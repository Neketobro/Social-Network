import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { Loader, NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { UsersProfile } from '../../layout'
import { selectUsers, selectUserLogin } from '../../store';

export function UsersProfilePage() {
    const users = useSelector(selectUsers);
    const isUser = useSelector(selectUserLogin);

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
                        <Loader />
                    )}
                </>
            }
        />
    )
}