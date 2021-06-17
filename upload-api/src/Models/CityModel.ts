import sequelize from "../shared/dbcontext";
import { DataType, DataTypes} from "sequelize";

export const city = sequelize.define('Cities',
 {
    id: {
     type: DataTypes.INTEGER,
     primaryKey:true,
     autoIncrement:true,
    },
    file:{
        type: DataTypes.STRING,
        allowNull:false
    },
    city: {
        type: DataTypes.STRING,
    },
    latitude: {
        type:DataTypes.FLOAT,
    },
    longitude:{
        type:DataTypes.FLOAT,
    },
    country: {
        type:DataTypes.STRING
    },
    citycode: {
        type:DataTypes.STRING
    },
    density: {
        type:DataTypes.DECIMAL
    },
    timezone: {
        type: DataTypes.STRING
    }
}, {
    modelName:"Cities",
    freezeTableName: true,
    timestamps: false
});

export interface City {
    city: string
    latitude: string
    longitude:string
    country: string
    citycode: string
    density: string
    timezone:string
}