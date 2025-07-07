import { useState, useEffect } from "react";
import { FaArrowUp, FaXmark } from "react-icons/fa6";
import "./UploadImg.css";
import imgPerfil from "../../../public/user.png";
import imgCurso from "../../assets/imgprevvideo.png";
import { post, get } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

interface Props {
  estilos?: "perfil" | "curso";
  onUploadComplete: (url: string) => void;
}

export default function UploadImage({ estilos = "perfil", onUploadComplete }: Props) {
  const { userId, setPhotoUrl } = useAuth();
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL;
  useEffect(() => {
    const fetchImagen = async () => {
      try {
        const response = await get<{ url: string }>(`/usuarios/${userId}/foto`);
        if (response?.data?.url) {
          setPreviewUrl(response.data.url);
          setPhotoUrl(response.data.url);         // Actualiza el contexto global
          onUploadComplete(response.data.url);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.warn("No se encontró imagen personalizada, mostrando por defecto.");
      }
    };

    if (estilos === "perfil" && userId) {
      fetchImagen();
    }
  }, [userId, estilos, onUploadComplete, setPhotoUrl]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("foto", file);
console.log("userId:", userId);
console.log("Enviando foto:", file);
for (const pair of formData.entries()) {
  console.log("FormData:", pair[0], pair[1]);
}
    try {
      const response = await post<{ url: string }>(`/usuarios/${userId}/foto`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.url) {
        setPreviewUrl(response.data.url);
        setFileName(file.name);
        setPhotoUrl(response.data.url);          // Actualiza el contexto global
        onUploadComplete(response.data.url);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setFileName(null);
    setPhotoUrl("");                             
    onUploadComplete("");
  };

  const getDefaultImage = () => {
    return estilos === "curso" ? imgCurso : imgPerfil;
  };

  return (
    <div className={`upload-container ${estilos}`}>
      <div className={`container-img ${estilos}`}>
        {previewUrl ? (
          <img src={previewUrl} alt="Imagen subida" />
        ) : (
          <img src={getDefaultImage()} alt="Imagen por defecto" />
        )}
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