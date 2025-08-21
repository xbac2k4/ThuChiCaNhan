import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import {
  getProfile,
} from '../../store/thunk/AuthThunk';

type AuthState = {
  notification: any[];
  profile: any;
  avatar: any;
};
const initState: AuthState = {
  notification: [],
  profile: null,
  avatar: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    RemoveData(state) {
      return initState;
    },
    ResetAvatar(state) {
      state.avatar = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
  },
});

export const {
  RemoveData,
  ResetAvatar,
}: {
  RemoveData: () => PayloadAction<void>;
  ResetAvatar: () => PayloadAction<void>;
} = authSlice.actions;
export default authSlice.reducer;

export const selectCommonState = (state: RootState) => state.commonReducer;
