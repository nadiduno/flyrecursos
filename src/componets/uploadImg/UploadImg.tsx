import { useState, useEffect } from "react";
import { FaArrowUp, FaXmark } from "react-icons/fa6";
import "./UploadImage.css";
import imgPerfil from "../../assets/fotodeperfil.png";
import imgCurso from "../../assets/fotocurso.png";
import { post, get } from "../../services/api"; 
import { useAuth } from "../../context/AuthContext";

interface Props {
  estilos?: "perfil" | "curso";
  onUploadComplete: (url: string) => void;
}

export default function UploadImage({ estilos = "perfil", onUploadComplete }: Props) {
  const { userId } = useAuth(); 
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchImagen = async () => {
      try {
        const response = await get<{ url: string }>(`/usuarios/${user.id}/foto`);
        if (response?.url) {
          setPreviewUrl(response.url);
          onUploadComplete(response.url);
        }
      } catch (error) {
        console.warn("No se encontró imagen personalizada, mostrando por defecto.");
      }
    };

    if (estilos === "perfil" && user?.id) {
      fetchImagen();
    }
  }, [user, estilos, onUploadComplete]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    const formData = new FormData();
    formData.append("archivo", file);

    try {
      const response = await post<{ url: string }>(`/usuarios/${user.id}/foto`, formData);
      if (response?.url) {
        setPreviewUrl(response.url);
        setFileName(file.name);
        onUploadComplete(response.url);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setFileName(null);
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