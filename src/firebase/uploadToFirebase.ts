import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebaseConfig";

const storage = getStorage(app)
const uploadToFirebase = async (file: File, userId: string): Promise<string> => {
  console.log("⏳ Subiendo a Firebase:", { userId, file });

  try {
    const storageRef = ref(storage, `usuarios/${userId}/${file.name}`);
    console.log("📁 Referencia Firebase creada:", storageRef.fullPath);

    await uploadBytes(storageRef, file);
    console.log("✅ Archivo subido con éxito");

    const downloadURL = await getDownloadURL(storageRef);
    console.log("🔗 URL pública obtenida:", downloadURL);

    return downloadURL;
  } catch (err) {
    console.error("🔥 Error al subir a Firebase:", err);
    throw err;
  }
};
export default uploadToFirebase;