// import { useState } from "react";
// import { FaArrowUp, FaXmark } from "react-icons/fa6";
// import "./UploadImage.css";
// import img from "../../assets/imgPerfil.png"
// import { post } from "../../services/api"; 

// interface Props {
//   carpeta: string;
//   onUploadComplete: (url: string) => void;
//   estilos?: "perfil" | "default";
//   urlPorDefecto?: string;
// }


// export default function UploadImage({ carpeta, onUploadComplete, estilos, urlPorDefecto }: Props) {
//   const [fileName, setFileName] = useState<string | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const storageRef = ref(storage, `${carpeta}/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Progreso de carga: ${progreso.toFixed(2)}%`);
//         },
//         (error) => {
//           console.error("Error al subir la imagen:", error);
//         },
//         async () => {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           setPreviewUrl(downloadURL);
//           setFileName(file.name);
//           onUploadComplete(downloadURL);
//         }
//       );
//     }
//   };

//   const handleRemove = () => {
//     setPreviewUrl(null);
//     setFileName(null);
//     onUploadComplete("");
//   };

//   return (
//     <div className={`upload-container ${estilos === "perfil" ? "perfil" : ""}`}>
//     <div className={`container-img ${estilos === "perfil" ? "perfil" : ""}`}>
//   {previewUrl ? (
//     <img src={previewUrl} alt="Imagen subida" />
//   ) : estilos === "perfil" && (
//     <img src={urlPorDefecto || img} alt="Imagen de perfil" />
//   )}
// </div>



// <label
//   htmlFor="file-upload"
//   className={`boton-upload ${estilos === "perfil" ? "perfil" : ""}`}
// >
//   Cargar imagen <FaArrowUp />
// </label>
//       <input
//         id="file-upload"
//         type="file"
//         accept="image/*"
//         onChange={handleUpload}
//         style={{ display: "none" }}
//       />
//       {previewUrl && (
//         <div className={`archivo-info ${estilos === "perfil"? "perfil": ""}`}>
//           <span>{fileName}</span>
//           <button className={`boton-excluir ${estilos === "perfil" ? "perfil" : ""}`} onClick={handleRemove}>
//             <FaXmark />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }