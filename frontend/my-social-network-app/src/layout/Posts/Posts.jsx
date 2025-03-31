import { Container, Avatar, Card, CardHeader, CardMedia, CardContent, Typography } from "@mui/material";

export function Posts({ users, posts }) {

    return (
        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 5,
            paddingBlock: '10px',
        }}>
            {users.map(({ id, profile_picture_letter, first_name, last_name }) => {
                const userPosts = posts.filter(post => post.userId === id);

                if (userPosts.length === 0) return null;

                return userPosts.map(({ id: postId, img, content }) => (
                    <Card
                        key={postId}
                        sx={{
                            width: '100%',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: '20px',
                        }}
                    >
                        <CardHeader
                            avatar={<Avatar>{profile_picture_letter}</Avatar>}
                            title={`${first_name} ${last_name}`}
                        />
                        {img && <CardMedia component="img" height="500" image={img} alt="Post image" />}
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {content}
                            </Typography>
                        </CardContent>
                    </Card>
                ));
            })}
        </Container>
    )
}