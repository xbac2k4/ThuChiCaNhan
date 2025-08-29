import { doneFetching, fetching } from "store/reducer/CommonReducer";
import { store } from "store/store";
import { addDocument, deleteData, readCollection, updateDocument } from "./FirebaseServices";
import { collections } from "constants/collectionFirebase";
import { showMessage } from "react-native-flash-message";

export const getWalletService = async () => {
    store.dispatch(fetching());
    try {
        const res = await readCollection(collections.WALLETS);
        return res;
    } catch (error: any) {
        return Promise.reject(error);
    } finally {
        store.dispatch(doneFetching());
    }
};

export const AddWalletService = async (params: any) => {
    store.dispatch(fetching());
    try {
        const res = await addDocument(collections.WALLETS, params);
        showMessage({
            floating: true,
            message: 'Thành Công',
            description: `Thêm ví thành công`,
            type: 'success',
            icon: 'success',
            duration: 3000,
        });
        return res;
    } catch (error: any) {
        showMessage({
            floating: true,
            message: 'Lỗi',
            description: `${error}`,
            type: 'danger',
            icon: 'danger',
            duration: 3000,
        });
        return Promise.reject(error);
    } finally {
        store.dispatch(doneFetching());
    }
};

export const UpdateWalletService = async (docId: string, params: any) => {
    store.dispatch(fetching());
    try {
        const res = await updateDocument(collections.WALLETS, docId, params);
        showMessage({
            floating: true,
            message: 'Thành Công',
            description: `Cập nhật ví thành công`,
            type: 'success',
            icon: 'success',
            duration: 3000,
        });
        return res;
    } catch (error: any) {
        showMessage({
            floating: true,
            message: 'Lỗi',
            description: `${error}`,
            type: 'danger',
            icon: 'danger',
            duration: 3000,
        });
        return Promise.reject(error);
    } finally {
        store.dispatch(doneFetching());
    }
};

export const DeleteWalletService = async (id: string) => {
    store.dispatch(fetching());
    try {
        const res = await deleteData(collections.WALLETS, id);
        return res;
    } catch (error: any) {
        console.log('error', error);
        return Promise.reject(error);
    } finally {
        store.dispatch(doneFetching());
    }
};