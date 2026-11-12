import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Character = sequelize.define('Character', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  data: { type: DataTypes.JSON, allowNull: false }
}, { tableName: 'character', timestamps: true });

export default Character;