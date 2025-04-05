import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_POST, FETCH_POST, selectPostStatus } from "../../../store";
import { useParams } from "react-router";
import { useEffect } from "react";

export function PostCardUser({ isUser, posts }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const postStatus = useSelector(selectPostStatus);

    const handleDelete = (postId) => {
        dispatch(DELETE_POST({ postId: postId }));

        if (postStatus === "success") {
            console.log('post was deleted')
        };

    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: 'space-around', flexDirection: 'column', gap: 5 }}>
                <Typography sx={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', borderBlock: '1px solid', borderColor: 'divider' }}>
                    My Posts
                </Typography>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Card
                            key={post.id}
                            sx={{
                                width: '100%',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: '20px',
                            }}
                        >
                            {post.img && (
                                <CardMedia component="img" height="500" image={post.img} alt="Post image" />
                            )}
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {post.content}
                                </Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                }}
                                disableSpacing
                            >
                                {isUser &&
                                    <>
                                        <Button
                                            variant='contained'
                                            sx={{ borderRadius: '0 0 10px 10px', color: 'text.secondary' }}
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            Delete
                                        </Button>
                                    </>}
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>No posts available</Typography>
                )}
            </Box>
        </>
    )
}