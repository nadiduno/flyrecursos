import { useEffect, useState } from "react";
import { get } from "../services/api";
import { CursoInfo } from "../types/interface";
import { formatarMensagemErro } from "../utils/formatarErrors";
import { useAuth } from "../context/AuthContext";

export const useCursoActivo = () => {
  const { userProfile } = useAuth();
  const [curso, setCurso] = useState<CursoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const cursoId = userProfile?.cursoIds?.[0];
  const nomeUsuario = userProfile?.nome || "aluno";

  useEffect(() => {
    if (!cursoId) {
      setError("Desculpe, você ainda não tem um curso atribuído.");
      setLoading(false);
      return;
    }

    const fetchCurso = async () => {
      try {
        const response = await get<CursoInfo>(`/api/cursos/${cursoId}`);
        setCurso(response.data);
      } catch (err) {
        setError(formatarMensagemErro(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [cursoId]);

  return { curso, loading, error, nomeUsuario };
};