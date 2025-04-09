import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserLoginError,
  selectUserLogin,
  selectUserLoginStatus,
  FETCH_USER_PROTECTED_DATA,
} from '../../store';
import { SnackbarAlert, InputField } from '../../components';
import { useRegisterHandler } from '../../utils';

export function RegisterPage() {
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectUserLoginError);
  const userLoginStatus = useSelector(selectUserLoginStatus);
  const isUser = useSelector(selectUserLogin);
  const navigate = useNavigate();
  const inputsRef = useRef({});

  useEffect(() => {
    dispatch(FETCH_USER_PROTECTED_DATA());
  }, [dispatch]);

  useEffect(() => {
    if (isUser) navigate('/');
  }, [isUser, navigate]);

  const { handleRegister } = useRegisterHandler({ inputsRef, setLoading, setOpen });

  const clearForm = () => {
    Object.keys(inputsRef.current).forEach((key) => {
      if (inputsRef.current[key]) {
        inputsRef.current[key].value = '';
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleRegister();
  };

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
          <Button variant="contained" type="submit" disabled={loading} fullWidth>
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
