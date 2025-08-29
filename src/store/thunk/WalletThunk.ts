import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWalletService } from 'services/walletServices';

export const getListWalletThunk = createAsyncThunk<any[], void>(
    'wallet/list-wallet',
    async () => {
        const response = await getWalletService();
        return response;
    },
);
