import { Sequelize } from 'sequelize';

// Initialiser Sequelize avec SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../database.sqlite', // Fichier de la base de données
});

export default sequelize;
