import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {RootState} from '../store';

const currentDay = moment().format('DD-MM-YYYY');

interface InitState {
  isLoading: boolean;
  active: boolean;
  day: string;
}
const initState: InitState = {
  isLoading: false,
  active: false,
  day: currentDay,
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initState,
  reducers: {
    changeDay(state, action) {
      state.day = action.payload;
    },
    appAcive(state) {
      state.active = true;
    },
    fetching(state) {
      state.isLoading = true;
    },
    doneFetching(state) {
      state.isLoading = false;
    },
  },
});

export const {
  fetching,
  doneFetching,
  appAcive,
  changeDay,
} = commonSlice.actions;
export default commonSlice.reducer;
export const selectCommonState = (state: RootState) => state.commonReducer;
