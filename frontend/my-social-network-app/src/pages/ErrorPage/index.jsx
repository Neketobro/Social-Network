import { Box, Typography } from "@mui/material";
import { NavBarLeft, NavBarRight, PageLayout } from '../../components';

export function ErrorPage() {
    
    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() =>
                <Box>
                    <Typography component='p' variant="h1">Error 404</Typography>
                    <Typography component='p' variant="h2">Page not found</Typography>
                </Box>
            }
        />
    )
}