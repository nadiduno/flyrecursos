import { useState } from "react";
import { post } from "../../services/api";
import toast from "react-hot-toast";
import { formatarMensagemErro } from "../../utils/formatarErrors";

export function Matricular() {
  const [alunoId, setAlunoId] = useState("");
  const [cursoId, setCursoId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📤 Enviando matrícula...");
    console.log("Aluno ID:", alunoId);
    console.log("Curso ID:", cursoId);

    const payload = [Number(cursoId)];

    console.log("🧾 Payload final:", payload);
    console.log("➡️ Endpoint: /alunos/" + alunoId + "/matricular");

    try {
      const response = await post(`/alunos/${alunoId}/matricular`, payload);
      console.log("✅ Resposta da API:", response);

      toast.success("Aluno matriculado com sucesso!");
      setAlunoId("");
      setCursoId("");
    } catch (err) {
      console.error("❌ Erro ao matricular aluno:", err);
      const errorMessage = formatarMensagemErro(err);
      toast.error(errorMessage || "Erro ao matricular aluno.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full w-full border-secondary border-2 rounded-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="my-[1rem] md:mt-[3rem] text-m md:text-xl lg:text-xl mx-auto text-center font-bold ">
          MATRÍCULA DE ALUNO
        </p>

        <div className="w-full grid md:grid-cols-2 min-h-[16rem] gap-2 md:gap-6 px-4 md:px-8 lg:px-12 items-star content-start">
          {/* ID do Aluno */}
          <div className="w-full flex flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              ID do aluno
            </label>
            <input
              type="text"
              value={alunoId}
              onChange={(e) => setAlunoId(e.target.value)}
              placeholder="Digite o ID do aluno"
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black font-normal border-secondary shadow-[0px_4px_4px_rgba(0,0,0,0.2)] md:text-lg"
              required
            />
          </div>

          {/* ID do Curso */}
          <div className="w-full flex flex-col">
            <label className="w-full md:text-m py-[0.5rem] md:pt-[2rem] text-left md:text-lg">
              ID do curso
            </label>
            <input
              type="text"
              value={cursoId}
              onChange={(e) => setCursoId(e.target.value)}
              placeholder="Digite o ID do curso"
              className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black font-normal border-secondary shadow-[0px_4px_4px_rgba(0,0,0,0.2)] md:text-lg"
              required
            />
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