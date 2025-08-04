import { useOverlayTriggerState } from "react-stately";
import {
  useOverlayTrigger,
  useButton,
  usePopover,
  OverlayContainer,
} from "react-aria";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "../../../services/api";
import { CgAdd } from "react-icons/cg";

// Schema de validação com Zod
const moduleSchema = z.object({
  titulo: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(100, "O título não pode ter mais que 100 caracteres"),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

interface CreateModulePopoverProps {
  onModuleCreated: (newModuleId: number) => void;
}

export function CreateModulePopover({
  onModuleCreated,
}: CreateModulePopoverProps) {
  // Estado e referências para o popover
  const state = useOverlayTriggerState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Configuração do popover
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef
  );

  const { buttonProps } = useButton(triggerProps, triggerRef);
  const { popoverProps } = usePopover(
    {
      ...overlayProps,
      triggerRef,
      popoverRef,
      isNonModal: true,
    },
    state
  );

  // Configuração do formulário com react-hook-form e zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      titulo: "",
    },
  });

  const onSubmit = async (data: ModuleFormData) => {
    try {
      const response = await post<{ id: number }>("/api/modulos", data);
      if (response.data.id) {
        onModuleCreated(response.data.id);
        state.close();
        reset();
      }
    } catch (error) {
      console.error("Erro ao criar módulo:", error);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <button
          {...buttonProps}
          ref={triggerRef}
          className="ml-1 md:ml-5 w-[1.5rem] h-[1.5rem] rounded-full text-primary2 flex items-center justify-center  hover:text-secondary4 transition-colors duration-200"
          title="Adicionar um novo módulo"
        >
          <CgAdd size={30} />
        </button>
        <span className="hidden md:block">Adicionar um novo módulo</span>
      </div>

      {state.isOpen && (
        <OverlayContainer>
          <div
            {...popoverProps}
            ref={popoverRef}
            className="z-50 w-[20rem] md:w-[24rem] m-4 p-6 bg-white border border-secondary rounded-lg shadow-lg text-primary1"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="text-secondary">
                <label htmlFor="titulo">Título do Módulo</label>
                <input
                  id="titulo"
                  {...register("titulo")}
                  placeholder="Digite o título do módulo"
                  className="w-full mt-1 border-gray-200 text-primary1"
                />
                {errors.titulo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.titulo.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    state.close();
                    reset();
                  }}
                  className="px-3 py-1 text-sm hover:text-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-[9rem] md:w-[15rem] h-[1.5rem] md:h-[2.5rem] rounded-[50px] text-white bg-primary2 gap-2 flex justify-center items-center hover:bg-secondary4 hover:text-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-center font-bold text-[1rem] transition-colors duration-200"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </OverlayContainer>
      )}
    </>
  );
}
