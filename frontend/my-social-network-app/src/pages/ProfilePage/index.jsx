
import { NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { Profile } from '../../layout';

export function ProfilePage() {
    
    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() =>
                <Profile />
            }
        />
    )
}