import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  alignment: {
    type: DataTypes.ENUM('Héroe', 'Neutral', 'Villano'),
    defaultValue: 'Neutral',
    allowNull: false
  },
  avatar: { type: DataTypes.STRING(500) }
}, { tableName: 'user', timestamps: true });

export default User;