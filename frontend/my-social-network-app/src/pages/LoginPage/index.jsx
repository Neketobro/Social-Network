import { Box, Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FETCH_USER_LOGIN, FETCH_USER_LOGIN_ERROR, selectUserLoginError } from "../../store";

export function LoginPage() {
    const dispatch = useDispatch();
    const error = useSelector(selectUserLoginError)
    const emailRef = useRef();
    const passwordRef = useRef();

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function submitHandler(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!validateEmail(email)) {
            dispatch(FETCH_USER_LOGIN_ERROR("Invalid email format"));
            return;
        }
        if (password.length < 6) {
            dispatch(FETCH_USER_LOGIN_ERROR("Password must be at least 6 characters"));
            return;
        }

        const data = {
            email: email,
            password: password
        }

        dispatch(FETCH_USER_LOGIN(data));
    }

    return (
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={5} sx={{ padding: '2vh', height: 'auto', width: '25vw', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', border: '1px solid', borderColor: 'divider', borderRadius: '10px' }}>
                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        Sign in
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Welcome user, please sign in to continue
                    </Typography>
                </Box>
                {error && <Typography color="error">{error}</Typography>}
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '20vw', height: '6vh' }, display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                    noValidate
                    autoComplete="off"
                    onSubmit={submitHandler}
                >
                    <TextField error={error} label="Enter your email" variant="outlined" inputRef={emailRef} />
                    <TextField error={error} label="Enter your password" type="password" variant="outlined" inputRef={passwordRef} />
                    <Button variant="contained" type="submit">Sign in</Button>
                </Box>

                <Typography sx={{ color: 'text.secondary', textAlign: 'end' }}>
                    Don't have an account?
                    <NavLink to='/register' style={{ textDecoration: 'none' }}>
                        <Button variant='text'>
                            Register
                        </Button>
                    </NavLink>
                </Typography>
            </Paper>
        </Container>
    );
}
