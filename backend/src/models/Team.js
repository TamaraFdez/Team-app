import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  description: { type: DataTypes.TEXT },
  size: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'team', timestamps: true });

Team.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Team, { foreignKey: 'userId', as: 'teams' });

export default Team;