import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ListWalletThunk } from '../thunk/UserThunk';

type MainState = {
    list_wallet: any[]
};
const initState: MainState = {
    list_wallet: []
};

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        ResetAll(state) {
            return initState;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(ListWalletThunk.fulfilled, (state, action) => {
                state.list_wallet = action.payload;
            })
    },
});

export const {
    ResetAll,
}: {
    ResetAll: () => PayloadAction<void>;
} = userSlice.actions;

export default userSlice.reducer;

export const selectCommonState = (state: RootState) => state.commonReducer;
