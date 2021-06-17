import { Router } from "express";
import fs, { appendFile } from 'fs-extra';
import path  from "path";
import multer, { StorageEngine } from "multer";
import { ApplicationError } from "../Models/Error";
import { ApplicationStatus } from "../Models/HTTPStatus";
import { v4 as uuidv4 } from 'uuid';
import csvtojson from 'csvtojson'
import {city} from '../Models/CityModel'
import {Op} from 'sequelize'


const upload = multer();
const router = Router();

router.get("/", async (req, res)=>{
    const params  = req.query;
    let sortconfig: any;
    let limit: number = 0;
    let offset: number = 0;
    let query;
    
    console.log(params);

    if(!params.id) res.status(ApplicationStatus.BadRequest).send()
    
    //sort configuratoin
    if(params.field) {
        sortconfig = [[params.field, params.sort]]
    }

    //pagination configuration
    if(params.count && params.offset) {
        limit = parseInt(params.count.toString());
        offset = parseInt(params.offset.toString());
    }

    //search params congif 
    if(params.query && params.query != '') {
        query = {
            [Op.or]: { 
                "city": { [Op.like] : `%${params.query}%` },
                "latitude": { [Op.startsWith] :  parseFloat(params.query.toString()) },
                "longitude": { [Op.startsWith] : parseFloat(params.query.toString()) },
                "country": { [Op.like] : `%${params.query}%` },
                "citycode": { [Op.like] : `%${params.query}%` },
                "density": { [Op.startsWith] : parseFloat(params.query.toString()) },
                "timezone": { [Op.like] : `%${params.query}%` }
            }
        }
    }

    var data = await city.findAll({
        limit,
        offset,
        where: {
            file: params.id,
            ...query
        },
        order: sortconfig
    })
    var count = await city.count({
        where: {
            file: params.id,
            ...query
        }
    })
    return res.json({data, count});
});

router.post('/upload', upload.single("file"), async (req, res) => {
    console.log(req.file);
    let appError:ApplicationError;

    if(!req.file) {
        appError = {Message: "invalid file", status: ApplicationStatus.BadRequest}
        return res.json(appError).status(appError.status);  
    }

    if(!req.file.mimetype.includes("csv") && !req.file.mimetype.includes("excel")) {
        appError = {Message:"Please upload CSV",status: ApplicationStatus.BadRequest}
        return res.json(appError).status(appError.status);
    }
    
    //conver the object to json 
    const id = uuidv4();
    const temppath = path.resolve(__dirname, `../temp/ ${id}.csv`)
    fs.outputFileSync(temppath, req.file.buffer);

    //process and import the file in the database
    const csv = csvtojson();
    let data = await csv.fromFile(temppath);
    data = data.map(el => { return {...el,file:id} })
    await city.bulkCreate(data);
    return res.status(200).json({id})
})


export default router;
