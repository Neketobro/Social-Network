import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FETCH_USER_REGISTER,
  FETCH_USER_REGISTER_ERROR,
  selectUserLoginError,
  selectUsers,
  FETCH_USERS,
} from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export function RegisterPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(selectUserLoginError);
  const users = useSelector(selectUsers);
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const bioRef = useRef();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(FETCH_USERS(controller.signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function submitHandler(e) {
    e.preventDefault();
    const first_name = firstNameRef.current.value;
    const last_name = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const bio = bioRef.current.value;

    if (!first_name || !last_name) {
      dispatch(
        FETCH_USER_REGISTER_ERROR('First name and last name are required')
      );
      return;
    }
    if (!validateEmail(email)) {
      dispatch(FETCH_USER_REGISTER_ERROR('Invalid email format'));
      return;
    }
    if (password.length < 6) {
      dispatch(
        FETCH_USER_REGISTER_ERROR('Password must be at least 6 characters')
      );
      return;
    }
    if (users && users.some((user) => user.email === email)) {
      dispatch(FETCH_USER_REGISTER_ERROR('This email is already in use'));
      return;
    }

    const profile_picture_letter = first_name.charAt(0).toUpperCase();

    const data = {
      first_name,
      last_name,
      email,
      password,
      bio,
      id: `userId_${uuidv4()}`,
      profile_picture_letter,
    };

    dispatch(FETCH_USER_REGISTER(data));
    setOpen(true);
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  function SnackbarSuccess() {
    return (
      <Snackbar open={open}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          User successfully registered!
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: '2vh',
          width: '30vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '10px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          Register
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
        >
          Please fill in the details to create an account
        </Typography>
        {error && (
          <Typography color="error" sx={{ textAlign: 'center' }}>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            width: '100%',
          }}
          onSubmit={submitHandler}
        >
          <TextField
            label="First Name"
            variant="outlined"
            inputRef={firstNameRef}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            inputRef={lastNameRef}
            fullWidth
            required
          />
          <TextField
            error={error}
            label="Email"
            variant="outlined"
            inputRef={emailRef}
            fullWidth
            required
          />
          <TextField
            error={error}
            label="Password"
            type="password"
            variant="outlined"
            inputRef={passwordRef}
            fullWidth
            required
          />
          <TextField
            label="Bio"
            variant="outlined"
            inputRef={bioRef}
            fullWidth
            multiline
            rows={3}
          />
          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
        </Box>
        <Typography sx={{ color: 'text.secondary', textAlign: 'end' }}>
          Already have an account?
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="text">Sing in</Button>
          </NavLink>
        </Typography>
      </Paper>
      <SnackbarSuccess />
    </Container>
  );
}
