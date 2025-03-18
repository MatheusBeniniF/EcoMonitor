import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Leitura } from "../types";

interface LeituraGraphProps {
  leituras: Leitura[];
}

export function LeituraGraph({ leituras }: LeituraGraphProps) {
  const [selectedLocal, setSelectedLocal] = useState<string>("");

  const locais = useMemo(() => {
    return Array.from(new Set(leituras.map((l) => l.local)));
  }, [leituras]);

  const filteredData = useMemo(() => {
    const filtered = selectedLocal
      ? leituras.filter((l) => l.local === selectedLocal)
      : leituras;

    return filtered
      .sort(
        (a, b) =>
          new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime()
      )
      .map((l) => ({
        ...l,
        dataHoraFormatada: format(parseISO(l.data_hora), "dd/MM HH:mm", {
          locale: ptBR,
        }),
      }));
  }, [leituras, selectedLocal]);

  const getLineColor = (metrica: string) => {
    switch (metrica) {
      case "PM2.5":
        return "#ef4444";
      case "CO2":
        return "#3b82f6";
      case "temperatura":
        return "#f59e0b";
      default:
        return "#10b981";
    }
  };

  const metricas = useMemo(() => {
    return Array.from(new Set(leituras.map((l) => l.tipo)));
  }, [leituras]);

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Visualização Gráfica
        </h2>
        <select
          className="w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          value={selectedLocal}
          onChange={(e) => setSelectedLocal(e.target.value)}
        >
          <option value="">Todos os locais</option>
          {locais.map((local) => (
            <option key={local} value={local}>
              {local}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[400px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="dataHoraFormatada"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
              }}
              formatter={(value: number, name: string) => [
                `${value} ${
                  filteredData.find((d) => d.tipo === name)?.unidade || ""
                }`,
                name,
              ]}
            />
            <Legend />
            {metricas.map((metrica) => (
              <Line
                key={metrica}
                type="monotone"
                dataKey="valor"
                data={filteredData.filter((d) => d.tipo === metrica)}
                name={metrica}
                stroke={getLineColor(metrica)}
                dot={{ r: 4 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
