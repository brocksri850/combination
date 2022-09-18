//NPM
import { Sequelize } from "sequelize";
import * as SequelizeStatic from "sequelize";

//Import Files
import { databaseConfig } from "../common/dbConfig";
import { configs } from "../common/configs";
import { logger } from "../common/logger";

//models

import user, { UserModelStatic } from "./user-model";
import educationqualification, { EducationModelStatic } from "./educationQualification-model";
import workexperience, { WorkExperienceModelStatic } from "./workExperience-model";



export interface SequelizeModels {
  sequelize: Sequelize;

  User: UserModelStatic;
  EducationQualification: EducationModelStatic;
  WorkExperience: WorkExperienceModelStatic;
}

export class Database {
  private sequelizeStatic: any;
  private _models: SequelizeModels;
  private _sequelize: Sequelize;

  constructor(databasename: string) {
    this.sequelizeStatic = SequelizeStatic;
    let dbConfig = configs.getDatabaseConfig();

    if (dbConfig.logging) {
      dbConfig.logging = logger.info;
    }

    dbConfig.database = databasename;
    console.log(dbConfig);

    var sequelize = new this.sequelizeStatic(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      dbConfig
    );
    this._sequelize = sequelize;

    this._models = {
      sequelize,
      User: user(this._sequelize),
      EducationQualification: educationqualification(this._sequelize),
      WorkExperience: workexperience(this._sequelize)

    };

    var model: any;
    for (model in this._models) {
      if (model.associate) {
        model.associate(this._models);
      }
    }

    this._sequelize
      .authenticate()
      .then(() => {
        console.log("Database Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  }

  getModels() {
    return this._models;
  }

  initAssociations(models: SequelizeModels) {

    models.User.hasMany(models.EducationQualification, { foreignKey: "user_id", sourceKey: "user_id" });
    models.User.hasMany(models.WorkExperience, { foreignKey: "user_id", sourceKey: "user_id" });
  }

  getSequelize() {
    return this._sequelize;
  }
}

const database = new Database(databaseConfig.database);
export const models = database.getModels();
export const sequelize = database.getSequelize();
export const associations = database.initAssociations(models);

