// src/components/forms/register/RegisterInLot.tsx

import { useState, useEffect, useRef } from "react";
import { ButtonFly } from "../../botoes/ButtonFly";
import { FaFileExcel } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { get, post } from "../../../services/api";
import { formatarMensagemErro } from "../../../utils/formatarErrors";
import { AxiosError } from "axios";
import {
  RegisterInLotSchema,
  RegisterInLotFormData,
  CursoResponse,
  CursoInfo,
  AlunoImportResponse,
} from "../../../types/typeRegisterInLot";
import { toastCustomSuccess, toastCustomError } from "../../ToastCustom";

interface RegisterInLotProps {
  onCancel?: () => void;
}

export function RegisterInLot({ onCancel }: RegisterInLotProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterInLotFormData>({
    resolver: zodResolver(RegisterInLotSchema),
  });

  const [cursosDisponiveis, setCursosDisponiveis] = useState<CursoInfo[]>([]);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [errorCursos, setErrorCursos] = useState<string | null>(null);
  const [planilha, setPlanilha] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [relatorioErrosDisponivel, setRelatorioErrosDisponivel] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoadingCursos(true);
        const response = await get<CursoResponse>("/api/cursos");
        setCursosDisponiveis(response.data.content || []);
      } catch (err) {
        const errorMessage = formatarMensagemErro(err);
        setErrorCursos(errorMessage || "Não foi possível carregar os cursos.");
      } finally {
        setLoadingCursos(false);
      }
    };
    fetchCursos();
  }, []);

  const onSubmit: SubmitHandler<RegisterInLotFormData> = async (data) => {
    if (!planilha) {
      setUploadError("Por favor, selecione uma planilha.");
      return;
    }
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", planilha);

    try {
      // Adicionando console.log para rastreamento
      console.log("Iniciando a requisição para matricular em lote...");
      const matriculaResponse = await post<AlunoImportResponse>(
        `/api/cursos/${data.cursoId}/alunos/importar/xlsx`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { totalImportados, erros } = matriculaResponse.data;

      if (erros.length > 0) {
        console.log("Matrícula concluída com erros. Gerando relatório...");
        toastCustomError(
          "Sucesso Parcial",
          "Importação Concluída com Erros",
          `Foram importados ${totalImportados} alunos, mas ${erros.length} apresentaram erros. Um relatório de erros foi gerado.`
        );
        setRelatorioErrosDisponivel(true);
      } else {
        console.log("Todos os alunos foram matriculados com sucesso.");
        toastCustomSuccess(
          "Sucesso",
          "Matrícula em Lote Concluída",
          `Todos os ${totalImportados} alunos foram matriculados com sucesso.`
        );
        reset();
        setPlanilha(null);
        setRelatorioErrosDisponivel(false);
      }
    } catch (err) {
      console.error("--- ERRO NA MATRÍCULA EM LOTE ---");
      console.error("Objeto de erro completo:", err);
      
      let errorMessage = "Ocorreu um erro desconhecido. Por favor, tente novamente.";

      if (err instanceof AxiosError) {
        console.error("Erro é uma instância de AxiosError.");
        console.error("Objeto de resposta do Axios:", err.response);
        console.error("Dados da resposta do Axios:", err.response?.data);

        const responseData = err.response?.data;
        if (responseData && typeof responseData === 'object' && 'mensagem' in responseData) {
          errorMessage = (responseData as { mensagem: string }).mensagem;
          console.log("Mensagem extraída do servidor:", errorMessage);
        } else {
          errorMessage = "Erro no servidor. Por favor, contate o suporte.";
          console.log("Não foi possível extrair a mensagem. Usando mensagem genérica.");
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
        console.log("Erro é uma instância de Error. Mensagem:", errorMessage);
      }
      
      toastCustomError("Erro", "Matrícula em Lote", errorMessage);
      // Mantemos a suposição de que um relatório foi gerado.
      setRelatorioErrosDisponivel(true);
    }
  };


  const handleDownloadRelatorio = async () => {
    try {
      const response = await get("/alunos/importar/relatorio-erros", {
        responseType: "blob",
        // Incluir 500 no validateStatus para tentar ler o corpo do erro
        validateStatus: (status) => (status >= 200 && status < 300) || status === 404 || status === 500,
      });

      // Explicitamente tipar response.data como Blob
      const responseData = response.data as Blob;

      if (response.status !== 200) {
        // Se o status for 404 ou 500, tenta ler o blob para extrair o JSON de erro
        const reader = new FileReader();

        reader.onload = () => {
          try {
            const errorJson = JSON.parse(reader.result as string);
            const errorMessage = errorJson.mensagem || "Não foi possível encontrar o relatório de erros.";
            toastCustomError("Erro", "Download de Relatório", errorMessage);
          } catch (e) {
            toastCustomError("Erro", "Download de Relatório", "Ocorreu um erro no servidor ao tentar obter o relatório.");
          }
        };
        
        reader.readAsText(responseData);
        return;
      }

      // Se a resposta é 200 OK, mas o arquivo é vazio
      if (responseData.size === 0) {
        toastCustomError(
          "Erro",
          "Download de Relatório",
          "O relatório de erros está vazio ou não foi gerado."
        );
        return;
      }

      // Lógica de download para um blob válido
      const url = window.URL.createObjectURL(new Blob([responseData]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "erros-importacao.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      toastCustomSuccess(
        "Sucesso",
        "Download Concluído",
        "Relatório de erros baixado com sucesso."
      );
    } catch (err) {
      console.error("Erro no download do relatório:", err);
      const errorMessage =
        formatarMensagemErro(err) ||
        "Ocorreu um erro desconhecido no download do relatório.";
      toastCustomError("Erro", "Download de Relatório", errorMessage);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full flex-row text-xs my-3 p-1 md:p-3 lg:p-3">
      {/* ... (código do formulário HTML) ... */}
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex items-center justify-between p-2 md:p-6 lg:p-6">
          <p className="text-xl font-medium">Matricular em lote</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto my-4 flex flex-col justify-center items-center">
          <div className="flex justify-center p-5">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) =>
                setPlanilha(e.target.files ? e.target.files[0] : null)
              }
              accept=".xlsx, .xls"
              ref={fileInputRef}
            />
            <ButtonFly
              text={planilha ? planilha.name : "Carregar planilha"}
              icon={FaFileExcel}
              iconPosition="left"
              onClick={handleButtonClick}
            />
          </div>
          {planilha && (
            <p className="text-sm text-green-500 mt-2">
              Planilha selecionada: {planilha.name}
            </p>
          )}
          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}
          <div className="w-[95%] flex flex-col md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-full gap-0">
                <label className="w-full md:text-m py-[0.125rem] md:pt-[1rem] text-left md:text-lg">
                  Curso a matricular
                </label>
                {loadingCursos ? (
                  <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                ) : errorCursos ? (
                  <p className="text-red-500">{errorCursos}</p>
                ) : (
                  <select
                    className="w-full min-h-[2.5rem] bg-white rounded-[5px] pl-1 text-black md:text-m font-normal border-secondary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] placeholder:text-secondary md:text-lg"
                    {...register("cursoId", { valueAsNumber: true })}
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
                {cursosDisponiveis.length === 0 && !loadingCursos && (
                  <p className="text-red-500 text-sm mt-2">
                    Nenhum curso disponível.
                  </p>
                )}
                {errors.cursoId?.message && (
                  <p className="text-red-500 text-xs md:text-[1rem] mt-1">
                    {errors.cursoId.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-[7.5rem] md:h-[10.4rem] rounded-b-[10px] flex justify-center items-center space-x-4 mt-[1rem] border-b-[3px] border-primary2">
            <button
              className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] border-secondary bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary2 hover:text-black transition-colors duration-200"
              type="button"
              onClick={onCancel}
            >
              <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem] text-secondary3">
                Cancelar
              </p>
            </button>
            <button
              className="w-[8rem] md:w-[15rem] h-[3rem] rounded-[50px] bg-primary2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-secondary4 hover:text-black transition-colors duration-200"
              type="submit"
              disabled={isSubmitting}
            >
              <p className="leading-tight tracking-normal text-center font-bold md:text-[1.25rem]">
                {isSubmitting ? "Matriculando..." : "Matricular"}
              </p>
            </button>
          </div>
        </div>
      </form>
      {relatorioErrosDisponivel && (
        <div className="flex justify-center mt-4">
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownloadRelatorio}
          >
            Download Relatório de Erros
          </button>
        </div>
      )}
    </div>
  );
}