import { Model, DataTypes, UUID } from 'sequelize';

const GroupModel = (sequelize) => {
    class Group extends Model {}
    Group.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false,
            notEmpty: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "Entrez le nom du groupe"
                },
                notEmpty: {
                    msg: "Entrez le nom du groupe"
                },
                len: {
                    args: [1, 25],
                    msg: "La longueur du nom doit être entre 1 et 25 caractères"
                }
            }
        },
        password: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            notEmpty: false,
            validate: {
                notNull: {
                    msg: "Entrez un mot de passe"
                },
                notEmpty: {
                    msg: "Entrez un mot de passe"
                },
                min: {
                    args: 7,
                    msg: "La longueur du mot de passe doit être minimum de 7 caractères"
                }
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        penalty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: "Group",
        tableName: "groups"
    });
    return Group;
}

export default GroupModel;
