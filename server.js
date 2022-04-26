import {start} from "./src/core/app";

const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') dotenv.config();
import { dbConnection} from './src/core'

dbConnection().then(res=>{
    start();
})
