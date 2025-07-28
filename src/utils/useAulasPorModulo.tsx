import { useEffect, useState, useRef } from "react";
import { get } from "../services/api"; 
import { Aula } from "../types/interface";
import { formatarMensagemErro } from "../utils/formatarErrors";

const aulasCache = new Map<number, Aula[]>();

export const useAulasPorModulo = (moduloId: number) => {
  const [aulas, setAulas] = useState<Aula[]>(() => aulasCache.get(moduloId) || []);
  const [loading, setLoading] = useState(() => !aulasCache.has(moduloId));
  const [error, setError] = useState("");
  const fetchRef = useRef(false); // evita fetch duplicado

  useEffect(() => {
    if (!moduloId) return;

    if (aulasCache.has(moduloId)) {
      console.log(`💾 Aulas do módulo ${moduloId} carregadas do cache`);
      setAulas(aulasCache.get(moduloId)!);
      setLoading(false);
      return;
    }

    if (fetchRef.current) return; // evita fetch duplicado
    fetchRef.current = true;

    const buscarAulas = async () => {
      try {
        const response = await get<Aula[]>(`/api/modulos/${moduloId}/aulas`);
        console.log(`✅ Aulas do módulo ${moduloId}:`, response.data);
        aulasCache.set(moduloId, response.data);
        setAulas(response.data);
        setError("");
      } catch (err) {
        const erroFormatado = formatarMensagemErro(err);
        console.error("❌ Erro ao buscar aulas:", err);
        setError(erroFormatado || "Erro ao carregar aulas.");
      } finally {
        setLoading(false);
      }
    };

    buscarAulas();
  }, [moduloId]);

  return { aulas, loading, error };
};
