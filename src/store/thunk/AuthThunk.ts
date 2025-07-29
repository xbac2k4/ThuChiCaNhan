import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAppAccess,
  getAvatar,
  getMe,
} from '../../services/authServices';

export const getProfile = createAsyncThunk('auth/profile', async () => {
  try {
    const response = await getMe();
    return response;
  } catch (error) { }
});

export const getAvatarThunk = createAsyncThunk('auth/getAvartar', async () => {
  try {
    const response = await getAvatar();

    return response;
  } catch (error) { }
});
