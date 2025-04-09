import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FETCH_USER_REGISTER,
  FETCH_USER_REGISTER_ERROR,
  selectUserLoginError,
  selectUserLogin,
  selectUserLoginStatus,
  FETCH_USER_PROTECTED_DATA
} from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { SnackbarAlert, InputField } from '../../components';

export function RegisterPage() {
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState('')
  const [loading, setLoading] = useState(false)
  const [severity, setSeverity] = useState('')
  const dispatch = useDispatch();
  const error = useSelector(selectUserLoginError);
  const userLoginStatus = useSelector(selectUserLoginStatus);
  const isUser = useSelector(selectUserLogin)
  const navigate = useNavigate();

  const inputsRef = useRef({});

  useEffect(() => {
    dispatch(FETCH_USER_PROTECTED_DATA());
  }, [dispatch]);

  useEffect(() => {
    if (isUser) navigate('/');
  }, [isUser, navigate]);

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const clearForm = () => {
    Object.keys(inputsRef.current).forEach((key) => {
      if (inputsRef.current[key]) {
        inputsRef.current[key].value = '';
      }
    });
  };

  function submitHandler(e) {
    e.preventDefault();
    const first_name = inputsRef.current.firstName.value.trim();
    const last_name = inputsRef.current.lastName.value.trim();
    const email = inputsRef.current.email.value.trim();
    const password = inputsRef.current.password.value.trim();
    const bio = inputsRef.current.bio.value;
    setLoading(true);

    if (!first_name || !last_name) {
      dispatch(
        FETCH_USER_REGISTER_ERROR('First name and last name are required')
      );
      return;
    }
    if (!email) {
      dispatch(FETCH_USER_REGISTER_ERROR('Email is required'));
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
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
      dispatch(FETCH_USER_REGISTER_ERROR('Password must include at least one uppercase letter and one number'));
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
  }

  useEffect(() => {
    if (open && !error && userLoginStatus === 'success') {
      setMessageAlert('Successfully registered!');
      setSeverity('success');
      setLoading(false);
      clearForm();
      const timer = setTimeout(() => {
        navigate('/login');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (error && userLoginStatus === 'error') {
      setSeverity('error');
      setMessageAlert(error);
      setLoading(false);
    }
  }, [open, error, userLoginStatus, navigate]);

  const resetErrorOnChange = () => {
    if (messageAlert) {
      setMessageAlert('');
      setSeverity('');
    }
  };

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
        {!!error && (
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
          <InputField
            label="First Name"
            inputRef={(el) => (inputsRef.current.firstName = el)}
            error={!!error}
            onChange={resetErrorOnChange}
            required
          />
          <InputField
            label="Last Name"
            inputRef={(el) => (inputsRef.current.lastName = el)}
            error={!!error}
            onChange={resetErrorOnChange}
            required
          />
          <InputField
            label="Email"
            inputRef={(el) => (inputsRef.current.email = el)}
            error={!!error}
            onChange={resetErrorOnChange}
            required
          />
          <InputField
            label="Password"
            type="password"
            inputRef={(el) => (inputsRef.current.password = el)}
            error={!!error}
            onChange={resetErrorOnChange}
            required
          />
          <InputField
            label="Bio"
            multiline
            rows={3}
            inputRef={(el) => (inputsRef.current.bio = el)}
          />
          <Button variant="contained" type="submit" loading={loading} fullWidth>
            Register
          </Button>
        </Box>
        <Typography sx={{ color: 'text.secondary', textAlign: 'end' }}>
          Already have an account?
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="text">Sign in</Button>
          </NavLink>
        </Typography>
      </Paper>
      <SnackbarAlert open={open} messageAlert={messageAlert} severity={severity} />
    </Container>
  );
}
