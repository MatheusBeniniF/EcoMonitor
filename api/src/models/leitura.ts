import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Leitura extends Model {
  public id!: number;
  public local!: string;
  public data_hora!: Date;
  public tipo!: string;
  public valor!: number;
}

Leitura.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    local: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'leituras',
  }
);

export default Leitura;
