import { Avatar, Box, Typography } from "@mui/material";

export function AllUsersProfile({ users }) {
    console.log('users -> ', users);

    return (
        <>
            {users && Object.keys(users).length > 0 ? (
                users.map(({ id, profile_picture_letter, first_name, last_name }) => (
                    <Box key={id}>
                        <Avatar>
                            {profile_picture_letter}
                        </Avatar>
                        <Typography>
                            {`${first_name}  ${last_name}`}
                        </Typography>
                    </Box>
                ))
            ) : (
                <Typography>
                    Users undefiend
                </Typography>
            )}
        </>
    )
}
