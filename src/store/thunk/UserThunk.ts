import {createAsyncThunk} from '@reduxjs/toolkit';

export const ListWalletThunk = createAsyncThunk<any[], void>(
  'user/list-wallet',
  async () => {
    // const response = [];
    return [];
  },
);
