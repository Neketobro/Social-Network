import { Button, Typography } from '@mui/material';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

export function ButtonLogOut() {
    function logoutUser() {
        sessionStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <Button variant='text' sx={{ width: '100%', height: '5vh', margin: '0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderRadius: '0', borderBlock: '1px solid', borderColor: 'divider' }} onClick={logoutUser}>
            <Typography sx={{ width: '20px', height: '20px', textAlign: 'center', color: 'text.secondary' }}>
                <ExitToAppOutlinedIcon />
            </Typography>
            <Typography sx={{ width: '15vw', height: '20px', textAlign: 'center', color: 'text.secondary', fontWeight: 'bold' }}>
                Log out
            </Typography>
        </Button>
    )
}