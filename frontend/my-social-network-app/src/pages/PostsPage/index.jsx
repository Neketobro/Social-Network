import { Box, CircularProgress } from "@mui/material";
import { NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { Posts } from '../../layout';

export function PostsPage() {
    return (
        <PageLayout
            renderHeader={() => <NavBarLeft />}
            renderFooter={() => <NavBarRight />}
            renderMain={() =>
                <>
                    <Posts />
                </>
                // isLoading ? (
                //     <Box display="flex" justifyContent="center" mt={4}>
                //         <CircularProgress />
                //     </Box>
                // ) : (
                //     <Posts />
                // )
            }
        />
    )
}