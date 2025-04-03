import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { AllUsersProfile, FriendsUserProfile } from '../../layout'
import { selectUsers, selectUserLogin } from '../../store';

export function UsersProfilePage() {
    const users = useSelector(selectUsers)
    const isUser = useSelector(selectUserLogin)

    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() =>
                <>
                    {users && typeof users === 'object' &&
                        <Container sx={{ background: 'red', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <AllUsersProfile users={users} />
                            {isUser && Object.keys(isUser).length > 0 && <FriendsUserProfile isUser={isUser} />}
                        </Container>
                    }
                </>
            }
        />
    )
}