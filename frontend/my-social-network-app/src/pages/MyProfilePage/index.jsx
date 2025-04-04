import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserLogin } from "../../store";
import { NavBarLeft, NavBarRight, PageLayout, Loader } from '../../components';

export function MyProfilePage() {
    const navigate = useNavigate();
    const user = useSelector(selectUserLogin);

    useEffect(() => {
        if (user?.id) {
            navigate(`/profile/${user.id}`);
        } else {
            navigate('/login')
        }
    }, [user, navigate]);

    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() => <Loader />}
        />
    )
}

