import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Character from './Character.js';
import Team from './Team.js';


const Recruit = sequelize.define('Recruit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  state: { 
    type: DataTypes.ENUM('Pendiente', 'Aceptado', 'Rechazado'), 
    defaultValue: 'Pendiente',
    allowNull: false 
  },
  recruitmentDate: { type: DataTypes.DATE }
}, { tableName: 'recruit', timestamps: true });

Recruit.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Recruit.belongsTo(Character, { foreignKey: 'characterId', as: 'character' });
Recruit.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

export default Recruit;