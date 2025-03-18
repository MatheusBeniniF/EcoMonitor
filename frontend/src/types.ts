export interface Leitura {
  id: string;
  local: string;
  data_hora: string;
  tipo: 'PM2.5' | 'CO2' | 'temperatura';
  valor: number;
  unidade: string;
}

export interface LeituraInput {
  local: string;
  data_hora: string;
  tipo: 'PM2.5' | 'CO2' | 'temperatura';
  valor: number;
  unidade: string;
}