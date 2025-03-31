import { Box } from '@mui/material';
import { ButtonDivider } from './ButtonDivider';

export function NavBarRight() {
    return (
        <Box sx={{
            height: '100%',
            border: '1px solid',
            borderColor: 'divider'
        }}>
            <ButtonDivider />
        </Box>
    )
}