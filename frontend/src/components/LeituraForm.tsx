import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeitura, updateLeitura } from "../api";
import { Leitura, LeituraInput } from "../types";
import { toast } from "react-hot-toast";
import { Save, X } from "lucide-react";

interface LeituraFormProps {
  leitura?: Leitura;
  onClose: () => void;
}

export function LeituraForm({ leitura, onClose }: LeituraFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<LeituraInput>({
    local: leitura?.local || "",
    data_hora: leitura?.data_hora || new Date().toISOString().slice(0, 16),
    tipo: leitura?.tipo || "PM2.5",
    valor: leitura?.valor || 0,
    unidade: leitura?.unidade || "mg/m³",
  });

  const mutation = useMutation({
    mutationFn: (data: LeituraInput) =>
      leitura ? updateLeitura(leitura.id, data) : createLeitura(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leituras"] });
      toast.success(leitura ? "Leitura atualizada!" : "Leitura criada!");
      onClose();
    },
    onError: () => {
      toast.error("Erro ao salvar leitura");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const classes = {
    inputClass:
      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500",
    labelClass: "block text-sm font-medium text-gray-700",
    iconClass: "w-4 h-4 mr-2",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={classes.labelClass}>Local</label>
        <input
          type="text"
          required
          className={classes.inputClass}
          value={formData.local}
          onChange={(e) => setFormData({ ...formData, local: e.target.value })}
        />
      </div>

      <div>
        <label className={classes.labelClass}>Data e Hora</label>
        <input
          type="datetime-local"
          required
          className={classes.inputClass}
          value={formData.data_hora}
          onChange={(e) =>
            setFormData({ ...formData, data_hora: e.target.value })
          }
        />
      </div>

      <div>
        <label className={classes.labelClass}>Tipo de Métrica</label>
        <select
          className={classes.inputClass}
          value={formData.tipo}
          onChange={(e) =>
            setFormData({
              ...formData,
              tipo: e.target.value as LeituraInput["tipo"],
            })
          }
        >
          <option value="PM2.5">PM2.5</option>
          <option value="CO2">CO2</option>
          <option value="temperatura">Temperatura</option>
        </select>
      </div>

      <div>
        <label className={classes.labelClass}>Valor</label>
        <input
          type="number"
          step="0.01"
          required
          className={classes.inputClass}
          value={formData.valor}
          onChange={(e) =>
            setFormData({ ...formData, valor: parseFloat(e.target.value) })
          }
        />
      </div>

      <div>
        <label className={classes.labelClass}>Unidade</label>
        <input
          type="text"
          required
          className={classes.inputClass}
          value={formData.unidade}
          onChange={(e) =>
            setFormData({ ...formData, unidade: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <X className={classes.iconClass} />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
        >
          <Save className={classes.iconClass} />
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}
