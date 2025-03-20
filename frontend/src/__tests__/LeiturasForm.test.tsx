import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LeituraForm } from "../components/LeituraForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Leitura } from "../types";

const queryClient = new QueryClient();

const local = 'Local';
const data_hora = 'Data e Hora';
const tipo = 'Tipo de Métrica';
const valor = 'Valor';
const unidadeTitulo = 'Unidade';
const salaA = 'Sala A';
const salaB = 'Sala B';
const id = '1';
const pm2 = 'PM2.5';
const unidade = 'µg/m³';
const dataHoraFormatada = "2024-03-10T10:00";

describe("LeituraForm Component", () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar os campos do formulário e permitir alteração de inputs", () => {
    const leitura: Leitura = {
      id: id,
      local: salaA,
      data_hora: dataHoraFormatada,
      tipo: pm2,
      valor: 35,
      unidade: unidade,
    };

    render(
      <QueryClientProvider client={queryClient}>
        <LeituraForm leitura={leitura} onClose={mockOnClose} />
      </QueryClientProvider>
    );

    expect(screen.getByLabelText(local)).toHaveValue(salaA);
    expect(screen.getByLabelText(data_hora)).toHaveValue(
      dataHoraFormatada
    );
    expect(screen.getByLabelText(tipo)).toHaveValue(pm2);
    expect(screen.getByLabelText(valor)).toHaveValue(35);
    expect(screen.getByLabelText(unidadeTitulo)).toHaveValue(unidade);

    fireEvent.change(screen.getByLabelText(local), {
      target: { value: salaB },
    });
    fireEvent.change(screen.getByLabelText(valor), {
      target: { value: "40" },
    });

    expect(screen.getByLabelText(local)).toHaveValue(salaB);
    expect(screen.getByLabelText(valor)).toHaveValue(40);

    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
