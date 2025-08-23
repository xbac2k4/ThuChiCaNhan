import { doneFetching, fetching } from "store/reducer/commonReducer";
import { store } from "store/store";
import { addDocument, deleteData } from "./firebaseServices";
import { collections } from "constants/collectionFirebase";

export const AddWalletService = async (params: any) => {
    store.dispatch(fetching());
    try {
        await addDocument(collections.WALLETS, params);
    } catch (error: any) {
        return Promise.reject(error);
    } finally {
        store.dispatch(doneFetching());
    }
};

export const DeleteWalletService = async (params: any) => {
    store.dispatch(fetching());
    try {
        await deleteData(collections.WALLETS, params);
    } catch (error: any) {
        return Promise.reject(error);
    } finally {
        store.dispatch(doneFetching());
    }
};