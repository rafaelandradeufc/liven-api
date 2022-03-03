import { createConnection } from "typeorm";
import 'reflect-metadata';
import app from './app';

// create typeorm connection
createConnection().then(() => {

  // start express server
  const port = process.env.APP_PORT || 3000;
  app.listen(port, () => console.log(`App start in localhost:${port} !`));
});