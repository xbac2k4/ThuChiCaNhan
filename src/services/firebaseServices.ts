import { getAuth } from '@react-native-firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, updateDoc, where } from '@react-native-firebase/firestore';

const db = getFirestore();

const formatTimestamp = (timestamp: any) => {
  if (!timestamp) return null;
  if (typeof timestamp.toDate === "function") {
    return timestamp.toDate().toISOString();
  }
  return new Date(timestamp).toISOString();
};
// lấy dữ liệu
export const readCollection = async (collectionName: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Người dùng chưa đăng nhập");

    const q = query(collection(db, collectionName), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    const data: any[] = [];
    querySnapshot.forEach((doc: any) => {
      const docData = doc.data();

      data.push({
        id: doc.id,
        ...docData,
        createdAt: formatTimestamp(docData.createdAt),
        updatedAt: formatTimestamp(docData.updatedAt),
      });
    });

    return data;
  } catch (error) {
    console.error("Lỗi đọc Firestore:", error);
    return [];
  }
};

// lấy chi tiết
export const readDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Lỗi đọc document:", error);
    return null;
  }
};

export const addDocument = async (collectionName: string, data: Record<string, any>) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("Người dùng chưa đăng nhập");

    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Lỗi thêm document:", error);
    return null;
  }
};

export const deleteData = async (collectionName: string, docId: string) => {
  try {    
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return { success: true, message: "Xóa thành công" };
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
    throw error;
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: Record<string, any>
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Lỗi cập nhật document:", error);
    return false;
  }
};