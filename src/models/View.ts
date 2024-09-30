import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/db';

// Définir le modèle des vues d'articles
class View extends Model {
  public slug!: string;
  public views!: number;
}

View.init(
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'View',
  }
);

// Synchroniser le modèle avec la base de données
View.sync();

export default View;
