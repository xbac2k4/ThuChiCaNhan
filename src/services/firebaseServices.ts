import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, where } from '@react-native-firebase/firestore';

const db = getFirestore();
// lấy dữ liệu
export const readCollection = async (collectionName: string) => {
  try {
    const collections = collection(db, collectionName)
    const data: any[] = [];
    const querySnapshot = await getDocs(collections);
    querySnapshot.forEach((doc: any) => {
      data.push({ id: doc.id, ...doc.data() });
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
      console.warn("Document không tồn tại:", docId);
      return null;
    }
  } catch (error) {
    console.error("Lỗi đọc document:", error);
    return null;
  }
};

export const addDocument = async (collectionName: string, data: Record<string, any>) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log("Document thêm thành công với ID:", docRef.id);
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
    console.log("Đã xóa thành công:", docId);
  } catch (error) {
    console.error("Lỗi khi xóa dữ liệu:", error);
  }
};