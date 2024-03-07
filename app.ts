import express from 'express';
import 'dotenv/config'

import { catalogRouter } from './routes/catalogRouter';
import { jadwalRouter } from './routes/jadwalRouter';
import { pesanTiketRouter } from './routes/pesanTiketRouter';



const app = express();
const port = process.env.PORT;

// REMINDER NEED TO CONFIG THE CORS OPTION. * origin is not recommended for deployment
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/catalog", catalogRouter);
app.use("/api/jadwal", jadwalRouter);
app.use("/api/pesanTiket", pesanTiketRouter);


app.get('/', (req, res) => {
  res.send('Hello world!, api catalog is available');
});

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});

