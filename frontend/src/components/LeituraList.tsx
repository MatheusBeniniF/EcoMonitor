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

  const filteredLeituras = leituras.filter(
    (leitura) =>
      leitura.local.toLowerCase().includes(search.toLowerCase()) ||
      leitura.tipo.toLowerCase().includes(search.toLowerCase())
  );

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por local ou tipo de métrica..."
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <Plus className="w-4 h-4 mr-2" />
            Nova Leitura
          </button>
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

      {viewMode === "graph" ? (
        <LeituraGraph leituras={filteredLeituras} />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Métrica
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeituras.map((leitura) => (
                <tr key={leitura.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leitura.local}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(new Date(leitura.data_hora), "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leitura.tipo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {leitura.valor} {leitura.unidade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
