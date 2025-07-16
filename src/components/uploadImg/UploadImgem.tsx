import { useState, useEffect } from "react";
import { FaArrowUp, FaXmark } from "react-icons/fa6";
import "./UploadImgemStilos.css";
import { patch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import uploadToFirebase from "../../firebase/uploadToFirebase";
import { formatarMensagemErro } from "../../utils/formatarErrors";
import imgCurso from "../../assets/imgaulagrava.png";

interface Props {
  estilos?: "perfil" | "curso";
  onUploadComplete: (url: string) => void;
}

export function UploadImgem({ estilos = "perfil", onUploadComplete }: Props) {
  const { userId, userProfile, syncUserProfile } = useAuth();
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (estilos === "perfil" && userProfile?.fotoPerfilUrl) {
      setPreviewUrl(userProfile.fotoPerfilUrl);
    }
  }, [estilos, userProfile]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    try {
      const urlFirebase = await uploadToFirebase(file, userId);
      await patch(`/usuarios/${userId}/foto`, { url: urlFirebase });
      console.log("📸 Imagen subida correctamente:", urlFirebase);

      await syncUserProfile(); // Recarga desde el backend

      setPreviewUrl(urlFirebase);
      setFileName(file.name);
      onUploadComplete(urlFirebase);
    } catch (error) {
      const mensaje = formatarMensagemErro(error);
      console.error("Error al subir la imagen:", mensaje);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setFileName(null);
    onUploadComplete("");
    // O puedes permitir que el backend borre la imagen si lo deseas
  };

  const imagenFallback = imgCurso;

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

      {previewUrl && (
        <div className={`archivo-info ${estilos}`}>
          <span>{fileName}</span>
          <button className={`boton-excluir ${estilos}`} onClick={handleRemove}>
            <FaXmark />
          </button>
        </div>
      )}
    </div>
  );
}