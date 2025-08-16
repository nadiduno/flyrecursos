import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import "./UploadImgemStilos.css";
import { patch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import uploadToFirebase from "../../firebase/uploadToFirebase";
import { formatarMensagemErro } from "../../utils/formatarErrors";

interface Props {
  estilos?: "perfil" | "curso";
  onUploadComplete: (url: string) => void;
  imagenPorDefecto?: string;
  idUsuario?: string;
}

export function UploadImgem({
  estilos = "perfil",
  onUploadComplete,
  idUsuario,
}: Props) {
  const { userId, syncUserProfile, userProfile } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imagenFallback = "https://firebasestorage.googleapis.com/v0/b/flyeducation-1eea5.firebasestorage.app/o/fotoUsuario.jpg?alt=media&token=85ad7339-51d8-42ae-a392-b5b362cc7f15";

 useEffect(() => {
  const id = idUsuario || userId;

  if (estilos === "perfil" && id && userProfile?.fotoPerfilUrl) {
    setPreviewUrl(userProfile.fotoPerfilUrl);
  } else {
    setPreviewUrl(imagenFallback);
  }
}, [estilos, idUsuario, userId, userProfile]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const id = idUsuario || userId;
    if (!file || !id) return;

    try {
      const urlFirebase = await uploadToFirebase(file, id);
      await patch(`/usuarios/${id}/foto`, { url: urlFirebase });
      await syncUserProfile();

      setPreviewUrl(urlFirebase);
      onUploadComplete(urlFirebase);
    } catch (error) {
      const mensaje = formatarMensagemErro(error);
      console.error("Error al subir la imagen:", mensaje);
    }
  };

  return (
    <div className={`upload-container ${estilos}`}>
      <div className={`container-img ${estilos}`}>
        <img
          src={previewUrl || imagenFallback}
          alt={previewUrl ? "Imagen cargada" : "Imagen por defecto"}
        />
      </div>

      <label htmlFor="file-upload" className={`boton-upload ${estilos}`}>
        Cargar imagen <FaArrowUp />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
    </div>
  );
}