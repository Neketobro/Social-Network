import { Avatar, Box, Typography } from "@mui/material";

export function InfoCardUser({ isUser, user, posts }) {

    // console.log('info isUser -> ', isUser);
    
    return (
        <>
            {user && Object.keys(user).length > 0 ? (
                <Box sx={{ display: "flex", justifyContent: 'space-around', paddingBlock: 10 }}>
                    <Box>
                        <Avatar sx={{ width: 200, height: 200 }}>
                            {user.profile_picture_letter}
                        </Avatar>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                        <Typography sx={{ textAlign: 'end', fontSize: '1rem', color: 'text.secondary', fontWeight: 'bold' }}>
                            {user.email}
                        </Typography>
                        <Typography sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
                            {user.first_name + ' ' + user.last_name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 10 }}>
                            <Typography sx={{ fontSize: '1rem' }}>
                                Subscribers: {user.subscribers ? user.subscribers.length : 0}
                            </Typography>
                            <Typography sx={{ fontSize: '1rem' }}>
                                Posts: {posts.length}
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '1rem' }}>
                            {user.bio}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Typography color="error">
                    User undefiend!
                </Typography>
            )}
        </>
    )
}