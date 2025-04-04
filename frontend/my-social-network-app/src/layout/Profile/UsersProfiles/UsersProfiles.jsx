import { Avatar, Box, Typography } from "@mui/material";

export function UsersProfile({ users, isUser }) {
    const allUsers = [{ title: 'All users:' }, { title: isUser ? 'Followers:' : null },]
    let followers;

    // console.log('before users -> ', users);
    // console.log('isUser -> ', isUser);

    // if (!isUser || !users) return;

    function filterUser() {
        if (isUser) {
            followers = users.filter(user => isUser.subscribers.includes(user.id));
            users = followers
        } else {
            users = null;
        };
    }

    return (
        <>
            {users && Object.keys(users).length !== 0 ? allUsers.map(({ title }, id) => (
                <Box key={id} sx={{ width: '100%',}}>
                    <Typography variant="h5" component='h5' align='center' sx={{ border: isUser ? '1px solid' : 'none', borderColor: 'divider', borderRadius: '10px' }}>
                        {title}
                    </Typography>
                    <Box sx={{ paddingBlock: '20px', display: 'flex', alignItems: 'center', justifyContent: users && Object.keys(users).length > 4 ? 'space-between' : 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                        {users && Object.keys(users).length > 0 && (
                            users.map(({ id, profile_picture_letter, first_name, last_name }) => (
                                <Box key={id} sx={{ padding: '10px', minWidth: '5vw', width: '13vw', height: '8vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 5, border: '1px solid', borderColor: 'divider', borderRadius: '10px', }}>
                                    <Avatar>
                                        {profile_picture_letter}
                                    </Avatar>
                                    <Typography fontSize='1.4rem' noWrap='true' sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {`${first_name}  ${last_name}`}
                                    </Typography>
                                </Box>
                            ))
                        )}
                    </Box>
                    {filterUser()}
                </Box>
            )) : (
                <Typography>
                    User undefiend
                </Typography>
            )}
        </>
    )
}