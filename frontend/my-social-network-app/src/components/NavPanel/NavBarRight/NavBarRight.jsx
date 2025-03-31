import { Box } from '@mui/material';
import { ButtonDivider } from './ButtonDivider';

export function NavBarRight() {
    return (
        <Box sx={{
            background: 'blue',
            height: '100%',
        }}>
            <ButtonDivider />
        </Box>
    )
}