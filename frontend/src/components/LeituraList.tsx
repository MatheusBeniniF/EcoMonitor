import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getLeituras, deleteLeitura } from "../api";
import { Leitura } from "../types";
import { LeituraForm } from "./LeituraForm";
import { LeituraGraph } from "./LeituraGraph";
import { toast } from "react-hot-toast";
import { Edit, Trash2, Plus, Search, BarChart2, Table } from "lucide-react";

export function LeituraList() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingLeitura, setEditingLeitura] = useState<Leitura | undefined>();
  const [viewMode, setViewMode] = useState<"table" | "graph">("table");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: leituras = [], isLoading } = useQuery({
    queryKey: ["leituras"],
    queryFn: getLeituras,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLeitura,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leituras"] });
      toast.success("Leitura excluída!");
    },
    onError: () => {
      toast.error("Erro ao excluir leitura");
    },
  });

  const filteredLeituras = leituras.filter((leitura) => {
    const leituraDate = new Date(leitura.data_hora).getTime();

    // Verifica se a leitura está dentro do intervalo de datas
    const isWithinDateRange =
      (!startDate || leituraDate >= new Date(startDate).getTime()) &&
      (!endDate || leituraDate <= new Date(endDate).getTime());

    // Verifica se a leitura corresponde ao termo de busca
    const matchesSearch =
      leitura.local.toLowerCase().includes(search.toLowerCase()) ||
      leitura.tipo.toLowerCase().includes(search.toLowerCase());

    return isWithinDateRange && matchesSearch;
  });

  const handleEdit = (leitura: Leitura) => {
    setEditingLeitura(leitura);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta leitura?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLeitura(undefined);
  };

  const classes = {
    th: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    td: "px-6 py-4 whitespace-nowrap",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por local ou tipo de métrica..."
            className="pl-10 py-3 pr-3 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center space-x-2 justify-center">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-center md:space-x-2 mb-2 md:mb-0">
            <input
              type="date"
              className="px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={startDate}
              placeholder="Data Inicial"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              value={endDate}
              placeholder="Data Final"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md ${
                viewMode === "table"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Visualização em tabela"
            >
              <Table className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("graph")}
              className={`p-2 rounded-md ${
                viewMode === "graph"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Visualização em gráfico"
            >
              <BarChart2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              <Plus className="w-4 h-4" />{" "}
              <span className="ml-2 hidden sm:inline">Nova Leitura</span>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">
              {editingLeitura ? "Editar Leitura" : "Nova Leitura"}
            </h2>
            <LeituraForm leitura={editingLeitura} onClose={handleCloseForm} />
          </div>
        </div>
      )}

      {filteredLeituras.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Nenhuma leitura encontrada no intervalo de datas selecionado.
        </div>
      ) : viewMode === "graph" ? (
        <LeituraGraph leituras={filteredLeituras} />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={classes.th}>Local</th>
                <th className={classes.th}>Data/Hora</th>
                <th className={classes.th}>Métrica</th>
                <th className={classes.th}>Valor</th>
                <th className={classes.th}>Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeituras.map((leitura) => (
                <tr key={leitura.id} className="hover:bg-gray-50">
                  <td className={classes.td}>{leitura.local}</td>
                  <td className={classes.td}>
                    {format(new Date(leitura.data_hora), "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })}
                  </td>
                  <td className={classes.td}>{leitura.tipo}</td>
                  <td className={classes.td}>
                    {leitura.valor} {leitura.unidade}
                  </td>
                  <td className={classes.td}>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(leitura)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(leitura.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
