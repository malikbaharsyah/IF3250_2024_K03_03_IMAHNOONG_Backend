import express from 'express';
import 'dotenv/config'

import { catalogRouter } from './routes/catalogRouter';
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/catalog", catalogRouter);
app.get('/', (req, res) => {
  res.send('Hello world!, api catalog is available');
});

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});