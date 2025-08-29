import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getMe,
} from '../../services/AuthServices';

export const getProfile = createAsyncThunk('auth/profile', async () => {
  try {
    const res = await getMe();    
    return res;
  } catch (error) { }
});

