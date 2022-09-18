import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

interface MyModel extends Model { }

export type EducationModelStatic = typeof Model & { new(values?: object, options?: BuildOptions): MyModel; }

export default function (sequelize: Sequelize): EducationModelStatic {
    let educationqualification = <EducationModelStatic>sequelize.define("EducationQualification", {
        education_qualification_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        passed_out_year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        institution: {
            type: DataTypes.STRING,
            allowNull: false
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        percentage: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

    }, {
        indexes: [],
        timestamps: false,
        freezeTableName: true,
        tableName: 'education_qualification'
    });

    return educationqualification;
}