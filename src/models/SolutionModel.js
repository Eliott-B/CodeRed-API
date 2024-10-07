import { Model, DataTypes } from 'sequelize';
import { groupModel, enigmaModel } from '../index.js';

const SolutionModel = (sequelize) => {
    class Solution extends Model {}
    Solution.init({
        enigma_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: enigmaModel,
                key: 'id'
            }
        },
        group_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
                model: groupModel,
                key: 'id'
            }
        },
        solution: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: false,
            validate: {
                notNull: {
                    msg: "Entrez une réponse"
                },
                notEmpty: {
                    msg: "Entrez une réponse"
                },
                len: {
                    args: [1, 255],
                    msg: "La longueur de la réponse doit être entre 1 et 255 charactères"
                }
            }
        },
        input_file: {
            type: DataTypes.BLOB('long')
        },
        console_output: {
            type: DataTypes.TEXT('long')
        },
        success: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tip_used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: "Solution",
        tableName: "solutions"
    });
    return Solution;
}

export default SolutionModel;
