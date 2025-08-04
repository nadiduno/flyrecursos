import { useEffect, useState } from "react";
import { get, post } from "../../../services/api";
import toast from "react-hot-toast";
import { formatarMensagemErro } from "../../../utils/formatarErrors";

interface AlunoInfo {
  id: number;
  nome: string;
}

interface CursoInfo {
  id: number;
  titulo: string;
}

export function Matricular() {
  const [alunoId, setAlunoId] = useState("");
  const [cursoId, setCursoId] = useState("");

  const [alunosDisponiveis, setAlunosDisponiveis] = useState<AlunoInfo[]>([]);
  const [cursosDisponiveis, setCursosDisponiveis] = useState<CursoInfo[]>([]);

  const [loadingAlunos, setLoadingAlunos] = useState(true);
  const [loadingCursos, setLoadingCursos] = useState(true);

  const [errorAlunos, setErrorAlunos] = useState<string | null>(null);
  const [errorCursos, setErrorCursos] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setLoadingAlunos(true);
        const response = await get<{ content: AlunoInfo[] }>("/alunos");
        setAlunosDisponiveis(response.data.content || []);
      } catch (err) {
        const mensagem = formatarMensagemErro(err);
        setErrorAlunos(mensagem || "Erro ao carregar alunos.");
      } finally {
        setLoadingAlunos(false);
      }
    };

    const fetchCursos = async () => {
      try {
        setLoadingCursos(true);
        const response = await get<{ content: CursoInfo[] }>("/api/cursos");
        setCursosDisponiveis(response.data.content || []);
      } catch (err) {
        const mensagem = formatarMensagemErro(err);
        setErrorCursos(mensagem || "Erro ao carregar cursos.");
      } finally {
        setLoadingCursos(false);
      }
    };

    fetchAlunos();
    fetchCursos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = [Number(cursoId)];

    try {
      await post(`/alunos/${alunoId}/matricular`, payload);
      toast.success("Aluno matriculado com sucesso!");
      setAlunoId("");
      setCursoId("");
    } catch (err) {
      const errorMessage = formatarMensagemErro(err);
      toast.error(errorMessage || "Erro ao matricular aluno.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full w-full border-secondary border-2 rounded-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="my-[1rem] md:mt-[3rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold">
          MATRÍCULA DE ALUNO
        </p>

        <div className="w-full grid md:grid-cols-2 min-h-[16rem] gap-2 md:gap-6 px-4 md:px-8 lg:px-12 items-start content-start">
          {/* Seleção de Aluno */}
          <div className="w-full flex flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Aluno
            </label>
            {loadingAlunos ? (
              <p className="text-gray-400">Carregando alunos...</p>
            ) : errorAlunos ? (
              <p className="text-red-500">{errorAlunos}</p>
            ) : (
              <select
                value={alunoId}
                onChange={(e) => setAlunoId(e.target.value)}
                className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black font-normal border-secondary shadow-[0px_4px_4px_rgba(0,0,0,0.2)] md:text-lg"
                required
              >
                <option value="" disabled>
                  Selecione um aluno
                </option>
                {alunosDisponiveis.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Seleção de Curso */}
          <div className="w-full flex flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              Curso
            </label>
            {loadingCursos ? (
              <p className="text-gray-400">Carregando cursos...</p>
            ) : errorCursos ? (
              <p className="text-red-500">{errorCursos}</p>
            ) : (
              <select
                value={cursoId}
                onChange={(e) => setCursoId(e.target.value)}
                className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black font-normal border-secondary shadow-[0px_4px_4px_rgba(0,0,0,0.2)] md:text-lg"
                required
              >
                <option value="" disabled>
                  Selecione um curso
                </option>
                {cursosDisponiveis.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.titulo}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="w-full h-[5.5rem] md:h-[9.5rem] rounded-b-[10px] bg-white flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
          <button
            type="submit"
            className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] bg-primary2 shadow-[0px_4px_4px_rgba(0,0,0,0.2)] hover:bg-secondary4 hover:text-black transition-colors duration-200"
          >
            <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem]">
              Matricular
            </p>
          </button>
        </div>
      </div>
    </form>
  );
}