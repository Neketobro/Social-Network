import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserLogin } from "../../store";
import { CircularProgress, Container } from "@mui/material";

export function MyProfilePage() {
    const navigate = useNavigate();
    const user = useSelector(selectUserLogin);

    useEffect(() => {
        if (user?.id) {
            navigate(`/profile/${user.id}`);
        } else {
            navigate('/')
        }
    }, [user, navigate]);

    return (
        <Container sx={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Container>
    )
}

