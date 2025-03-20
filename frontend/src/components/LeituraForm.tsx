import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLeitura, updateLeitura } from "../api";
import { Leitura, LeituraInput } from "../types";
import { toast } from "react-hot-toast";
import { Save, X } from "lucide-react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";

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
    if (
      !formData.local ||
      !formData.data_hora ||
      !formData.unidade ||
      !formData.valor ||
      !formData.tipo
    ) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <Dialog open onClose={onClose} fullWidth>
      <DialogTitle>{leitura ? "Editar Leitura" : "Nova Leitura"}</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          className="flex flex-col gap-2"
        >
          <TextField
            label="Local"
            placeholder="São Paulo"
            fullWidth
            required
            className="!mt-3"
            value={formData.local}
            onChange={(e) =>
              setFormData({ ...formData, local: e.target.value })
            }
          />

          <TextField
            label="Data e Hora"
            type="datetime-local"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={formData.data_hora}
            onChange={(e) =>
              setFormData({ ...formData, data_hora: e.target.value })
            }
          />

          <FormControl fullWidth>
            <InputLabel id="tipo-label">Tipo de Métrica</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tipo: e.target.value as LeituraInput["tipo"],
                })
              }
              label="Tipo de Métrica"
            >
              <MenuItem value="PM2.5">PM2.5</MenuItem>
              <MenuItem value="CO2">CO2</MenuItem>
              <MenuItem value="temperatura">Temperatura</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Valor"
            type="number"
            fullWidth
            required
            inputProps={{ step: "0.01", min: "0" }}
            value={formData.valor}
            onChange={(e) =>
              setFormData({ ...formData, valor: parseFloat(e.target.value) })
            }
          />

          <TextField
            label="Unidade"
            fullWidth
            required
            value={formData.unidade}
            onChange={(e) =>
              setFormData({ ...formData, unidade: e.target.value })
            }
          />

          <DialogActions className="flex gap-2">
            <Button size="small" onClick={onClose} color="warning">
              <div className="flex items-center gap-2">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Cancelar</span>
              </div>
            </Button>
            <Button
              size="small"
              type="submit"
              variant="contained"
              color="primary"
              disabled={mutation.isPending}
            >
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Salvar</span>
              </div>
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
