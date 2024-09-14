import { Model, DataTypes } from 'sequelize';

const EnigmaModel = (sequelize) => {
    class Enigma extends Model {}
    Enigma.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(45),
            allowNull: false,
            notEmpty: false,
            validate: {
                notNull: {
                    msg: "Entrez un titre"
                },
                notEmpty: {
                    msg: "Entrez un titre"
                },
                len: {
                    args: [1, 45],
                    msg: "La longueur du titre doit être entre 1 et 45 charactères"
                }
            }
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            notEmpty: false,
            validate: {
                notNull: {
                    msg: "Entrez une description"
                },
                notEmpty: {
                    msg: "Entrez une description"
                },
                len: {
                    args: [1, 45],
                    msg: "La longueur de la description doit être entre 1 et 45 charactères"
                }
            }
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: false,
            defaultValue: 10,
            validate: {
                notNull: {
                    msg: "Entrez un nombre de points"
                },
                notEmpty: {
                    msg: "Entrez un nombre de points"
                }
            }
        }
    },
    {
        sequelize,
        modelName: "Enigma",
        tableName: "enigmas"
    });
    return Enigma;
}

export default EnigmaModel;
