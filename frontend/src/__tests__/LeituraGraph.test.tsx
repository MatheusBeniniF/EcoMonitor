import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Leitura } from "../types";
import { LeituraGraph } from "../components/LeituraGraph";

const visualizacao = "Visualização Gráfica";
const combobox = "combobox";
const locais = "Todos os locais";
const salaA = "Sala A";
const salaB = "Sala B";
const pm2 = "PM2.5";
const co2 = "CO2";
const temperatura = "temperatura";
const dataHoraFormatada = "2024-03-10T10:00:00Z";
const id = ["1", "2", "3"];
const unidade = ["µg/m³", "ppm", "°C"];

const leiturasMock: Leitura[] = [
  {
    local: salaA,
    data_hora: dataHoraFormatada,
    tipo: pm2,
    valor: 35,
    unidade: unidade[0],
    id: id[0],
  },
  {
    local: salaA,
    data_hora: dataHoraFormatada,
    tipo: co2,
    valor: 400,
    unidade: unidade[1],
    id: id[1],
  },
  {
    local: salaB,
    data_hora: dataHoraFormatada,
    tipo: temperatura,
    valor: 22,
    unidade: unidade[2],
    id: id[2],
  },
];

describe("LeituraGraph Component", () => {
  it("renderiza corretamente", () => {
    render(<LeituraGraph leituras={leiturasMock} />);

    expect(screen.getByText(visualizacao)).toBeInTheDocument();

    const select = screen.getByRole(combobox);
    expect(select).toBeInTheDocument();

    expect(screen.getByText(locais)).toBeInTheDocument();
    expect(screen.getByText(salaA)).toBeInTheDocument();
    expect(screen.getByText(salaB)).toBeInTheDocument();
  });
});
