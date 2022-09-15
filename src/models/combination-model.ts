import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

interface MyModel extends Model { }

export type CombinationModelStatic = typeof Model & { new(values?: object, options?: BuildOptions): MyModel; }

export default function (sequelize: Sequelize): CombinationModelStatic {
    let combination = <CombinationModelStatic>sequelize.define("Combination", {
        combination_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fit: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        indexes: [],
        timestamps: false,
        freezeTableName: true,
        tableName: 'combination'
    });

    return combination;
}

