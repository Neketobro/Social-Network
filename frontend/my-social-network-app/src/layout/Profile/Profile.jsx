import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { selectPostStatus, selectUserStatus } from "../../store";
import { Loader } from "../../components";
import { InfoCardUser } from "./InfoCardUser";
import { PostCardUser } from "./PostCardUser";
import { useEffect, useState } from "react";

export function Profile({ isUser, user, posts }) {
    const [loading, setLoading] = useState(false);
    const userStatus = useSelector(selectUserStatus);
    const postStatus = useSelector(selectPostStatus);

    useEffect(() => {
        if (userStatus === 'success' && postStatus === 'success') {
            setLoading(true);
        }
    }, [userStatus, postStatus])

    return (
        <Container>
            {loading ? (
                <>
                    <InfoCardUser isUser={isUser} user={user} posts={posts} />
                    <PostCardUser isUser={isUser} posts={posts} />
                </>
            ) : (
                <Loader />
            )}
        </Container>
    );
}
