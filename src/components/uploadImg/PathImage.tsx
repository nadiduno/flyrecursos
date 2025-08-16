import { patch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import { getStorage, ref, deleteObject } from "firebase/storage";

interface Props {
  idUsuario?: string;
  urlPorDefecto: string;
  onRemoveComplete?: () => void;
}

export function RemoverImagen({
  idUsuario,
  urlPorDefecto,
  onRemoveComplete,
}: Props) {
  const { userId, userProfile, syncUserProfile } = useAuth();

  const eliminarImagenAnterior = async (url: string) => {
    try {
      if (!url || url === urlPorDefecto) return; // No eliminar si ya es la por defecto

      const storage = getStorage();
      const decodedUrl = decodeURIComponent(url);
      const bucket = "flyeducation-1eea5";
      const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/`;
      const filePath = decodedUrl.replace(baseUrl, "").split("?")[0];

      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      console.log("🗑️ Imagen anterior eliminada de Firebase");
    } catch (error) {
      console.error("❌ Error al eliminar imagen anterior:", error);
    }
  };

  const handleRemoveImage = async () => {
    const id = idUsuario || userId;
    if (!id || !userProfile) return;

    try {
      await eliminarImagenAnterior(userProfile.fotoPerfilUrl);

      await patch(`/usuarios/${id}/foto`, { url: urlPorDefecto });
      await syncUserProfile();
      console.log("✅ Imagen restaurada a la imagen por defecto");

      if (onRemoveComplete) onRemoveComplete();
    } catch (error) {
      const mensaje = formatarMensagemErro(error);
      console.error("❌ Error al remover imagen:", mensaje);
    }
  };

  return (
    <button
      onClick={handleRemoveImage}
      className="w-full border border-gray-300 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1 rounded-lg my-2"
    >
      Remover imagen
    </button>
  );
}