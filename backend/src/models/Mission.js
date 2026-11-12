import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Team from './Team.js';

const Mission = sequelize.define('Mission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  missionId: { type: DataTypes.STRING(50), allowNull: false },
  name: { type: DataTypes.STRING(255), allowNull: false },
  stats: { type: DataTypes.JSON, allowNull: false },
  successPct: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  result: { 
    type: DataTypes.ENUM('Pendiente', 'Catástrofe', 'Misión fallida', 'Regulinchi', 'Terminada', 'Perfecto'),
    defaultValue: 'Pendiente',
    allowNull: false 
  },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'missionLog', timestamps: true });

Mission.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Mission.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

export default Mission;