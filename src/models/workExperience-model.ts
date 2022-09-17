import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

interface MyModel extends Model { }

export type WorkExperienceModelStatic = typeof Model & { new(values?: object, options?: BuildOptions): MyModel; }

export default function (sequelize: Sequelize): WorkExperienceModelStatic {
    let workExperience = <WorkExperienceModelStatic>sequelize.define("WorkExperience", {
        work_experience_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        resume_upload: {
            type: DataTypes.JSON,
            allowNull: false
        },

    }, {
        indexes: [],
        timestamps: false,
        freezeTableName: true,
        tableName: 'work_experience'
    });

    return workExperience;
}