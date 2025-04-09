// hooks/useRegisterHandler.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  FETCH_USER_REGISTER,
  FETCH_USER_REGISTER_ERROR,
} from '../store';
import { validateEmail } from '../utils';

export const useRegisterHandler = ({ inputsRef, setLoading, setOpen }) => {
  const dispatch = useDispatch();

  const handleRegister = useCallback(() => {
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
      dispatch(
        FETCH_USER_REGISTER_ERROR(
          'Password must include at least one uppercase letter and one number'
        )
      );
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
  }, [dispatch, inputsRef, setLoading, setOpen]);

  return { handleRegister };
};
