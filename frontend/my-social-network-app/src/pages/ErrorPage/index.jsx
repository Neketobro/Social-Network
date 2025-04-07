import { Box, Button, Typography } from "@mui/material";
import { NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { NavLink } from "react-router";

export function ErrorPage() {

    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() =>
                <Box sx={{ height: '80vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', gap: 5 }}>
                    <Typography component='p' variant="h1">Error 404</Typography>
                    <Typography component='p' variant="h2">Page not found</Typography>
                    <NavLink to='/'>
                        <Button variant='outlined' >Come back home page</Button>
                    </NavLink>
                </Box>
            }
        />
    )
}