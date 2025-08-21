import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMe,
} from '../../services/authServices';

export const getProfile = createAsyncThunk('auth/profile', async () => {
  try {
    const response = await getMe();
    return response;
  } catch (error) { }
});

