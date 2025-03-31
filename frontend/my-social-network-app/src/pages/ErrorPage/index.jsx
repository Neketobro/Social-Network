import { Box, Typography } from "@mui/material";

export function ErrorPage() {
    return (
        <Box>
            <Typography component='p' variant="h1">Error 404</Typography>
            <Typography component='p' variant="h2">Page not found</Typography>
        </Box>
    )
}