import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { getListWalletThunk } from '../thunk/WalletThunk';

type MainState = {
    list_wallet: any[]
};
const initState: MainState = {
    list_wallet: []
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState: initState,
    reducers: {
        ResetAll(state) {
            return initState;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getListWalletThunk.fulfilled, (state, action) => {
                state.list_wallet = action.payload;
            })
    },
});

export const {
    ResetAll,
}: {
    ResetAll: () => PayloadAction<void>;
} = walletSlice.actions;

export default walletSlice.reducer;

export const selectCommonState = (state: RootState) => state.commonReducer;
