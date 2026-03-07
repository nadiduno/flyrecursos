// src/components/forms/register/types.ts

import { z } from "zod";

// Schema do formulário para o Zod
export const RegisterInLotSchema = z.object({
  cursoId: z.number().int().positive("Selecione um curso válido."),
});

// Tipos baseados nos schemas da API
export interface CursoResponse {
  content: CursoInfo[];
}

export interface CursoInfo {
  id: number;
  titulo: string;
}

export interface AlunoImportError {
  linha: number;
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  motivoErro: string;
}

export interface AlunoImportResponse {
  totalImportados: number;
  erros: AlunoImportError[];
}

// Tipo do formulário
export type RegisterInLotFormData = z.infer<typeof RegisterInLotSchema>;