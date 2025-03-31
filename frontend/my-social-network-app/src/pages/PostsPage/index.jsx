import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Typography } from "@mui/material";
import { NavBarLeft, NavBarRight, PageLayout } from '../../components';
import { Posts } from '../../layout';
import { FETCH_USERS, POST_RESPONE, selectPost, selectPostStatus, selectUsers, selectUsersStatus } from "../../store";

export function PostsPage() {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers) || [];
    const posts = useSelector(selectPost) || [];
    const usersStatus = useSelector(selectUsersStatus);
    const postsStatus = useSelector(selectPostStatus);

    useEffect(() => {
        const controller = new AbortController();
        dispatch(FETCH_USERS(controller.signal));
        dispatch(POST_RESPONE(controller.signal));

        return () => {
            controller.abort();
        };
    }, [dispatch]);

    const isLoading = usersStatus === "loading" || postsStatus === "loading";
    const isError = usersStatus === "error" || postsStatus === "error";
    const isEmpty = !Array.isArray(users) || users.length === 0 || !Array.isArray(posts) || posts.length === 0;

    return (
        <PageLayout
            renderHeader={NavBarLeft}
            renderFooter={NavBarRight}
            renderMain={() =>
                isLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <>
                        <Typography variant="h5" component="h5" color="error">
                            503 Service Unavailable
                        </Typography>
                        <Typography component="p">
                            The server is temporarily unable to service your request due to maintenance downtime or capacity problems.
                        </Typography>
                        <Typography component="p">
                            Please try again later.
                        </Typography>
                    </>
                ) : isEmpty ? (
                    <Typography textAlign="center" mt={4}>
                        Posts not found...
                    </Typography>
                ) : (
                    <Posts users={users} posts={posts} />
                )
            }
        />
    );
}
